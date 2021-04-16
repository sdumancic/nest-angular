import {Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import {Permission} from "../permission/permission.entity";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany( () => Permission, {cascade: true})
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'},
    })
    permissions: Permission[];
}
