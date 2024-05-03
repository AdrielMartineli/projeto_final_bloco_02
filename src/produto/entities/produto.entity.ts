import { IsNotEmpty, IsNumber, isNotEmpty, isNumber } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produto"})
export class Produto{
    
    @PrimaryGeneratedColumn()// chave primaria e auto increment
    id:number;

    
    @IsNotEmpty()
    @Column({length:100, nullable: false})
    nome: string;

   @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, nullable: false})
    preco: number;

    
    @Column()
    foto: string;

   
    @ManyToOne(() => Categoria, (categoria) => categoria.produto,{
        onDelete: "CASCADE"
    })
    categoria: Categoria

    
}