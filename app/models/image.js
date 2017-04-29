var express = require(‘express’);
var fs = require(‘fs’);
var mongoose = require(‘mongoose’);
var Schema = mongoose.Schema;
var multer = require('multer');

var image = new imageSchema(

  { img:
      { data: Buffer, contentType: String }
  }
);
var image = mongoose.model('images',imageSchema);
