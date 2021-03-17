import {createRxDatabase, RxCollection, RxDatabase, RxDocument, RxJsonSchema, addRxPlugin} from "rxdb";

// add the server-plugin
import {RxDBServerPlugin} from 'rxdb/plugins/server';

addRxPlugin(RxDBServerPlugin);

// add the memory-adapter
import * as MemoryAdapter from 'pouchdb-adapter-memory';

addRxPlugin(MemoryAdapter);

// add the node-websql adapter
import pouchdb_adapter_node_websql from 'pouchdb-adapter-node-websql';
import * as path from "path";

addRxPlugin(pouchdb_adapter_node_websql);

/**
 * create database and collections
 */

const rootLocation = path.resolve();

const createDatabase = async () => {

    const db: RxDatabase = await createRxDatabase({
        // comment in following line to reproduce issue
        // name: path.join(rootLocation, 'db', 'serverdb'), // http://localhost:5000/db/items not found in browser
        name: 'serverdb', // http://localhost:5000/db/items shows one item in browser
        adapter: 'websql',
    });


    // create collection
    const mySchema = {
        version: 0,
        type: 'object',
        properties: {
            key: {
                type: 'string',
                primary: true
            },
            value: {
                type: 'string'
            }
        }
    };

    try {

        await db.addCollections({
            items: {
                schema: mySchema
            }
        });

        // insert one document
        await db.items.insert({
            key: 'foo',
            value: 'bar'
        });

    } catch (e) {
        console.log('error: ', e);
    }


    return db;
}

interface DatabaseType {
    get?: any
}

export const Database = createDatabase();




