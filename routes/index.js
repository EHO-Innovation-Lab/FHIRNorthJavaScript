var express = require('express');
var router = express.Router();

var fhir = require('fhir.js');

const uuidv4 = require('uuid/v4');


/**
* Displays index page.
*
*/
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'Node.js DHDR Medication Dispense Viewer'   
    });
});

/**
* Performs query on DHDR server and returns parsed response to client.
*
*/
router.post('/', function(req, res) {
    
    var headerValues = queryHeaderDHDR();    
    
    var config = {
        // DHDR Server Base Url
        baseUrl: 'http://lite.innovation-lab.ca:9443/dispense-service',
        headers: headerValues
    }
    
    var xhrRes = res;
    
    var adapter;    
    var client = fhir(config, adapter);

    var query = buildQuery(req.body);
    
    client
        .search( {type: 'MedicationDispense', 
                  query: query})
        .then(function(res){
            console.log(parseJSONBundle(res.data));
            xhrRes.send(parseJSONBundle(res.data));
        })
        .catch(function(res){
            //Error responses
            if (res.status){
                console.log('Error', res.status);
            }
            //Errors
            if (res.message){
                console.log('Error', res.message);
            }
            xhrRes.send(res);
        });
});

/**
* Builds query to be sent to DHDR server.
*
*/
function buildQuery(request) {    
    var query = {};

    query['patient:patient.identifier'] = "https://ehealthontario.ca/API/FHIR/NamingSystem/ca-on-patient-hcn|" + request.healthCardNumber;

    query['_format'] = "fhir+json";

    return query;
}

/**
* Returns custom headers required by DHDR server.
*
*/
function queryHeaderDHDR(){
    return {
        'ClientTxID': uuidv4(),
        'X-Sender-Id': "06d29224-25a2-4178-a203-8b1424a15bbe",
        'X-License-Text': "I hereby accept the service agreement here: https://innovation-lab.ca/media/1147/innovation-lab-terms-of-use.pdf"
    }    
}

/**
* Parses bundle returned from DHDR and returns javascript object containing all FHIR resources found in bundle.
*
*/
function parseJSONBundle(bundle){
    var entries = new Array(bundle.entry.length);                
    for(var i = 0; i < bundle.entry.length; i++){
        entries[i] = new Object();
        entries[i]["MedicationDispense"] = parseResource["MedicationDispense"](bundle.entry[i].resource);
        for(var j = 0; j < bundle.entry[i].resource.contained.length; j++){
            entries[i][BundleType(bundle.entry[i].resource.contained[j])] = parseResource[bundle.entry[i].resource.contained[j].resourceType](bundle.entry[i].resource.contained[j]);
        }
    }                
    return entries;
}

/**
* Object containing functions which simplify locations of data.
*
*/
var parseResource = {
    Patient(resource){
        return {
            id: resource.id,
            healthCardNumber: resource.identifier[0].value,
            givenName: resource.name[0].given[0],
            familyName: resource.name[0].family[0],
            gender: resource.gender,
            birthDate: resource.birthDate
        };
    },
    Practitioner(resource){
        return {
            id: resource.id,
            givenName: resource.name[0].given[0],
            familyName: resource.name[0].family[0]
        };
    },
    Medication(resource){
        return {
            id: resource.id,
            medicationName: resource.code.coding[0].display,
            medicationCode: resource.code.coding[0].code,
            medicationType: resource.code.coding[1].display,
            medicationTypeCode: resource.code.coding[1].code,
            medicationSubtype: resource.code.coding[2].display,
            medicationSubtypeCode: resource.code.coding[2].code
        };
    },
    MedicationDispense(resource){
        return {
            daysSupply: resource.daysSupply.value,
            id: resource.id,
            identifier: resource.identifier.value,
            status: resource.status,
            whenHandedOver: resource.whenHandedOver
        };
    },
    MedicationOrder(resource){
        return {
            id: resource.id,
            identifier: resource.identifier[0].value,
            medicationReference: resource.medicationReference.reference
        };
    }
};

/**
* Called by parseJSONBundle function. Required due to Patient resources since there are two possible subtypes (MasterPatient and DispensePatient).
*
*/
function BundleType(containedResource){
    if(containedResource.resourceType !== "Patient"){
        return containedResource.resourceType;
    }
    else{
        if(containedResource.id.charAt(3) === 'D'){
            return "DispensePatient";
        }
        else {
            return "MasterPatient";
        }
    }

}

module.exports = router;