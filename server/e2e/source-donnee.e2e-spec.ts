import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import SourceDonnee from '../src/domain/source-donnee.entity';
import { SourceDonneeService } from '../src/service/source-donnee.service';

describe('SourceDonnee Controller', () => {
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
      .overrideProvider(SourceDonneeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all source-donnees ', async () => {
    const getEntities: SourceDonnee[] = (
      await request(app.getHttpServer())
        .get('/api/source-donnees')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET source-donnees by id', async () => {
    const getEntity: SourceDonnee = (
      await request(app.getHttpServer())
        .get('/api/source-donnees/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create source-donnees', async () => {
    const createdEntity: SourceDonnee = (
      await request(app.getHttpServer())
        .post('/api/source-donnees')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update source-donnees', async () => {
    const updatedEntity: SourceDonnee = (
      await request(app.getHttpServer())
        .put('/api/source-donnees')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE source-donnees', async () => {
    const deletedEntity: SourceDonnee = (
      await request(app.getHttpServer())
        .delete('/api/source-donnees/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
