import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const commonConfPg = {
  SYNCRONIZE: false,
  ENTITIES: [__dirname + '/domain/postgresql/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/postgres/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations/postgres'
  },
  MIGRATIONS_RUN: true
};

const commonConfMongo = {
  SYNCRONIZE: false,
  ENTITIES: [__dirname + '/domain/mongodb/*.entity{.ts,.js}'],
  MIGRATIONS: [__dirname + '/migrations/mongodb/**/*{.ts,.js}'],
  CLI: {
    migrationsDir: 'src/migrations/mongodb'
  },
  MIGRATIONS_RUN: true
};

let ormconfig: TypeOrmModuleOptions[] = [
  {
    name: 'default',
    type: 'postgres',

    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'authenticate',
    /*
        replication :{
          master : {
            host: "server1",
            port: 3306,
            username: "test",
            password: "test",
            database: "test"
          },
          slaves : [{
            host: "server2",
            port: 3306,
            username: "test",
            password: "test",
            database: "test"
          }, {
            host: "server3",
            port: 3306,
            username: "test",
            password: "test",
            database: "test"
          }
          }]
        },
    */
    logging: true,
    synchronize: true,
    entities: commonConfPg.ENTITIES,
    migrations: commonConfPg.MIGRATIONS,
    cli: commonConfPg.CLI,
    migrationsRun: commonConfPg.MIGRATIONS_RUN
  },
  {
    name: 'mongo',
    type: 'mongodb',

    host: 'localhost',
    port: 27017,
    //username: 'mongo',
    //password: 'root',
    database: 'authenticate',
    useUnifiedTopology: true,
    logging: true,
    synchronize: true,
    entities: commonConfMongo.ENTITIES,
    migrations: commonConfMongo.MIGRATIONS,
    cli: commonConfMongo.CLI,
    migrationsRun: commonConfMongo.MIGRATIONS_RUN
  }
]

if (process.env.NODE_ENV === 'prod') {
  ormconfig = [
    {
      name: 'default',
      type: 'postgres',

      host: process.env.PG_HOST_MASTER,
      port: Number.parseInt(process.env.PG_PORT_MASTER),
      username: process.env.PG_USERNAME_MASTER,
      password: process.env.PG_PASSWORD_MASTER,
      database: process.env.PG_DATABASE_MASTER,

      /*
       replication :{
         master : {
           host: process.env.PG_HOST_MASTER,
           port: Number.parseInt(process.env.PG_PORT_MASTER),
           username: process.env.PG_USERNAME_MASTER,
           password: process.env.PG_PASSWORD_MASTER,
           database: process.env.PG_DATABASE_MASTER,
         },
         slaves : [{
           host: process.env.PG_HOST_SLAVE_1,
          port: Number.parseInt(process.env.PG_PORT_SLAVE_1),
           username: process.env.PG_USERNAME_SLAVE_1,
           password: process.env.PG_PASSWORD_SLAVE_1,
           database: process.env.PG_DATABASE_SLAVE_1,
         }, {
           host: process.env.PG_HOST_SLAVE_2,
          port: Number.parseInt(process.env.PG_PORT_SLAVE_2),
           username: process.env.PG_USERNAME_SLAVE_2,
           password: process.env.PG_PASSWORD_SLAVE_2,
           database: process.env.PG_DATABASE_SLAVE_2,
         }
         }]
       },
   */

      logging: true,
      synchronize: false,
      entities: commonConfPg.ENTITIES,
      migrations: commonConfPg.MIGRATIONS,
      cli: commonConfPg.CLI,
      migrationsRun: commonConfPg.MIGRATIONS_RUN
    },
    {
      name: 'mongo',
      type: 'mongodb',

      host: process.env.MONGO_HOST_MASTER,
      port: Number.parseInt(process.env.MONGOPORT_MASTER),
      username: process.env.MONGO_USERNAME_MASTER,
      password: process.env.MONGO_PASSWORD_MASTER,
      database: process.env.MONGO_DATABASE_MASTER,

      logging: true,
      synchronize: false,
      entities: commonConfMongo.ENTITIES,
      migrations: commonConfMongo.MIGRATIONS,
      cli: commonConfMongo.CLI,
      migrationsRun: commonConfMongo.MIGRATIONS_RUN
    }
  ]
}
/*
if (process.env.NODE_ENV === 'test') {
  ormconfigPg = {
    name: 'default',
    type: 'sqlite',
    database: ':memory:',
    logging: true,
    synchronize: true,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN
  };
}
*/

export { ormconfig };
