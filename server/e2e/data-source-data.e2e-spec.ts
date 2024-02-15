import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import DataSourceData from '../src/domain/data-source-data.entity';
import { DataSourceDataService } from '../src/service/data-source-data.service';

describe('DataSourceData Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(DataSourceDataService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all data-source-data ', async () => {
    const getEntities: DataSourceData[] = (
      await request(app.getHttpServer())
        .get('/api/data-source-data')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET data-source-data by id', async () => {
    const getEntity: DataSourceData = (
      await request(app.getHttpServer())
        .get('/api/data-source-data/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create data-source-data', async () => {
    const createdEntity: DataSourceData = (
      await request(app.getHttpServer())
        .post('/api/data-source-data')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update data-source-data', async () => {
    const updatedEntity: DataSourceData = (
      await request(app.getHttpServer())
        .put('/api/data-source-data')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE data-source-data', async () => {
    const deletedEntity: DataSourceData = (
      await request(app.getHttpServer())
        .delete('/api/data-source-data/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
