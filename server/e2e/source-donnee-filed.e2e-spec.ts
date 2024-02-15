import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import SourceDonneeFiled from '../src/domain/source-donnee-filed.entity';
import { SourceDonneeFiledService } from '../src/service/source-donnee-filed.service';

describe('SourceDonneeFiled Controller', () => {
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
      .overrideProvider(SourceDonneeFiledService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all source-donnee-fileds ', async () => {
    const getEntities: SourceDonneeFiled[] = (
      await request(app.getHttpServer())
        .get('/api/source-donnee-fileds')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET source-donnee-fileds by id', async () => {
    const getEntity: SourceDonneeFiled = (
      await request(app.getHttpServer())
        .get('/api/source-donnee-fileds/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create source-donnee-fileds', async () => {
    const createdEntity: SourceDonneeFiled = (
      await request(app.getHttpServer())
        .post('/api/source-donnee-fileds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update source-donnee-fileds', async () => {
    const updatedEntity: SourceDonneeFiled = (
      await request(app.getHttpServer())
        .put('/api/source-donnee-fileds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE source-donnee-fileds', async () => {
    const deletedEntity: SourceDonneeFiled = (
      await request(app.getHttpServer())
        .delete('/api/source-donnee-fileds/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
