var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var ServiceSchema = new Schema({
  ref: {type: Number},
  application : {type : String /*required: true, */},
  name: {type: String/*, required: true, trim: true*/},
  clients:  {type : Array /*required: true, */},
  type : {type : String},
  comment : {type : String /*required: true, */},
  description : {type : String /*required: true, */},
  documentation : {type : String /*required: true, */},
  impactKiss : {type : String /*required: true, */},
  mrc: {type : String /*required: true, */},
  probleme: {type: String /*required: true, */},
  date: {type : String},
  serviceRemplacant : {type : String},
  vuDansKiss: {type: String}
 // vuDansKiss: {type: Boolean}    
,
  soa: {
    dpPublication : {type : String, trim: true},
    backProt : {type : String} ,
    dpGateway : {type : String},
    frontProt : {type : String},
    publieBus : {type : String},
    remoteUrl : {type : String},
    soapBody : {type : String},
    chainageAval : {type : String},
    soapAction : {type : String}

  },
  
  fichier: {
    format : {type : String},
    transfertXfb : {type : String},
    transfertProt : {type : String}
  }

});


var ServiceModel = mongoose.model('Service', ServiceSchema); 
mongoose.connect('mongodb://localhost/Architecture');

exports.services = function (req, res) {
  return ServiceModel.find(function (err, services) {
    if (!err) {
      res.json(services);
    } else {
      console.log(err);
    }
  });
};

exports.service = function(req, res) {
  var id = req.params.id;
  if (id) {
    ServiceModel.findById(id, function (err, service) {
      if (!err) {
        if (service) {
          res.json({service: service, status: true});
        } else {
          res.json({ service: false });
        }
      } else {
        console.log(err);
      }
    });
  }
};

exports.add = function(req, res) {
    var service = req.body;
//    var dpPublication = req.body.soa.dpPublication;
    service = new ServiceModel(req.body
      
      /*ref: req.body.ref,
      application: req.body.application,
      name: req.body.name,
      clients: req.body.clients,
      type: req.body.type,
      comment: req.body.comment,
      description: req.body.description,
      documentation: req.body.documentation,
      impactKiss: req.body.impactKiss,
      mrc: req.body.mrc,
      probleme: req.body.probleme,
      date: req.body.date,
      serviceRemplacant: req.body.serviceRemplacant,
      vuDansKiss: req.body.vuDansKiss,
      
      "soa.dpPublication" : req.body.soa.dpPublication,
      "soa.backProt" : req.body.soa.backProt  ,
      "soa.dpGateway" : req.body.soa.dpGateway,
      "soa.frontProt" : req.body.soa.frontProt,
      "soa.publieBus" : req.body.soa.publieBus,
      "soa.remoteUrl" : req.body.soa.remoteUrl,
      "soa.soapBody" : req.body.soa.soapBody,
      "soa.chainageAval" : req.body.soa.chainageAval,
      
      "fichier.format" : req.body.fichier.format,
      "fichier.transfertXfb" : req.body.fichier.transfertXfb,
      "fichier.transfertProt" : req.body.fichier.transfertProt
      
    }*/);
    
    service.save(function (err) {
      if (!err) {
        res.json(true);
      } else {
        console.log(err);
        res.json(false);
      }
    });
    return res.jsonp(req.body);
};

exports.edit = function (req, res) {
  var id = req.params.id;
  if (id) {
    ServiceModel.findById(id, { upsert: true }, function (err, service) {
      
      service.ref = req.body.ref;
      service.application = req.body.application;
      service.name = req.body.name;
      service.clients = req.body.clients;
      service.type = req.body.type;
      service.comment = req.body.comment;
      service.description = req.body.description;
      service.documentation = req.body.documentation;
      service.impactKiss = req.body.impactKiss;
      service.mrc = req.body.mrc;
      service.probleme = req.body.probleme;
      service.date = req.body.date;
      service.serviceRemplacant = req.body.serviceRemplacant;
      service.vuDansKiss = req.body.vuDansKiss;

      if (req.body.soa) {
        service.soa.dpPublication = req.body.soa.dpPublication;
        service.soa.backProt = req.body.soa.backProt ;
        service.soa.dpGateway = req.body.soa.dpGateway;
        service.soa.frontProt = req.body.soa.frontProt;
        service.soa.publieBus = req.body.soa.publieBus;
        service.soa.remoteUrl = req.body.soa.remoteUrl;
        service.soa.soapBody = req.body.soa.soapBody;
        service.soa.chainageAval = req.body.soa.chainageAval;
        service.soa.soapAction = req.body.soa.soapAction;

      }

      if (req.body.fichier) {
        service.fichier.format = req.body.fichier.format;
        service.fichier.transfertXfb = req.body.fichier.transfertXfb;
        service.fichier.transfertProt = req.body.fichier.transfertProt;
     }
      
      service.save(function (err) {
        if (!err) {
          res.json(true);
        } else {
          res.json(false);
          console.log(err);
        }
      });
      
    });
  }
};

exports.delete = function (req, res) {
  var id = req.params.id;
  if (id) {
    ServiceModel.findById(id, function (err, service) {
      service.remove(function (err) {
        if (!err) {
          res.json(true);
        } else {
          res.json(false)
          console.log(err);
        }
      });
    });
  }
};