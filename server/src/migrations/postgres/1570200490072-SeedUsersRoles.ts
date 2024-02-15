import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../domain/postgresql/user.entity';
import { Authority } from '../../domain/postgresql/authority.entity';
import { TypeUser } from '../../domain/postgresql/enumeration/type-user';
import { LangKey } from '../../domain/postgresql/enumeration/lang-key';
import { UserCivility } from '../../domain/postgresql/enumeration/user-civility';

export class SeedUsersRoles1570200490072 implements MigrationInterface {
  role1: Authority = { name: 'ROLE_SUPER_ADMIN' };
  role2: Authority = { name: 'ROLE_ADMIN' };
  role3: Authority = { name: 'ROLE_USER' };
  role4: Authority = { name: 'ROLE_ANONYMOUS' };

  DateNow: Date = new Date(Date.now());

  user1: User = {
    login: 'admin',
    civility: UserCivility.SIR,
    password: '14356577103',
    firstName: 'Administrator',
    lastName: 'Administrator',
    email: 'admin@localhost.it',
    isActivated: true,
    document: null,
    typeUser: TypeUser.EMPLOYEE,
    langKey: LangKey.FR,
    isArchived: false,
    createdBy: 'system',
    createdDate: this.DateNow,
    lastModifiedBy: 'system',
    lastModifiedDate: this.DateNow
  };

  public async up(queryRunner: QueryRunner): Promise<any> {
    const conn = queryRunner.connection;
    await conn
      .createQueryBuilder()
      .insert()
      .into(Authority)
      .values([this.role1, this.role2, this.role3, this.role4])
      .execute();

    await conn
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([this.user1])
      .execute();

    await conn
      .createQueryBuilder()
      .relation(User, 'authorities')
      .of([this.user1])
      .add([this.role1]);

  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> { }
}
