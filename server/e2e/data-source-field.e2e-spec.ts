import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import DataSourceField from '../src/domain/data-source-field.entity';
import { DataSourceFieldService } from '../src/service/data-source-field.service';

describe('DataSourceField Controller', () => {
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
      .overrideProvider(DataSourceFieldService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all data-source-fields ', async () => {
    const getEntities: DataSourceField[] = (
      await request(app.getHttpServer())
        .get('/api/data-source-fields')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET data-source-fields by id', async () => {
    const getEntity: DataSourceField = (
      await request(app.getHttpServer())
        .get('/api/data-source-fields/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create data-source-fields', async () => {
    const createdEntity: DataSourceField = (
      await request(app.getHttpServer())
        .post('/api/data-source-fields')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update data-source-fields', async () => {
    const updatedEntity: DataSourceField = (
      await request(app.getHttpServer())
        .put('/api/data-source-fields')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE data-source-fields', async () => {
    const deletedEntity: DataSourceField = (
      await request(app.getHttpServer())
        .delete('/api/data-source-fields/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
