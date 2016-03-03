import _ from 'lodash';
import low from 'lowdb';
import storage from 'lowdb/browser';
import uuid from 'uuid';

const db = low('FakeHistoryDB', {storage});

export const insert = function(collectionName, obj){
    if(!collectionName || !obj) return;
    return db(collectionName).push(_.extend(obj,{_id : uuid()}));
}



