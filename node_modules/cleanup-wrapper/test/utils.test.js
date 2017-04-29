import gulp from 'gulp';
import {expect} from 'chai';
import {tmpDir, overrideMethod} from '../src/cleanup-wrapper';
import {expectEventuallyDeleted} from 'stat-again';

describe('Testing tmpDir wrapper', function() {

  before(function() {
    this.dirty = function() {
      return new Promise((resolve, reject) => {
        gulp.src('.babelrc').pipe(gulp.dest('tmp_utils'))
          .on('end', resolve)
          .on('error', reject);
      });
    };
    this.clean = tmpDir('tmp_utils', this.dirty);
  });

  it(`tmpDir wrapper cleans up dir`, function() {
    return this.clean().then(() => {
      return expectEventuallyDeleted('tmp_utils', 50, 10);
    });
  });

  it(`If dir already exists, tmpDir wrapper throws an error`,
    tmpDir('tmp_utils', function() {
    return this.dirty().then(this.clean)
      .catch(err => {
        expect(err).to.match(
          /Error: Dir '.*' already exists/);
      });
  }));

});

describe('Testing overrideMethod wrapper', function() {

  before(function() {
    this.object = {
      _name: 'original',
      name() {
        return this._name;
      }
    };

    this.dirty = function(object) {
      expect(object.name()).to.equal('overridden');
    };
    this.clean = overrideMethod(this.object, 'name', function() {
      return 'overridden';
    }, this.dirty);
  });

  it(`overrideMethod wrapper restores object after running`, function() {
    expect(this.dirty.bind(undefined, this.object)).to.throw(Error,
      /AssertionError: expected 'original' to equal 'overridden'/);
    expect(this.clean.bind(undefined, this.object)).not.to.throw();
    expect(this.object.name()).to.equal('original');
  });

});
