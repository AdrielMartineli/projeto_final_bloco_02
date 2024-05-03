import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto} from "../entities/produto.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ){}

    async findAll(): Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations:{
                categoria:true,
               
            }
        });

        // essa parada é basicamento um select * from tb_postagens;
        
    }

    async findById(id:number): Promise<Produto>{
        let produto = await this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria:true,
            }
        })
        //checar se a produto não foi encontrada
        if(!produto)
            throw new HttpException('Produto não encontrada!', HttpStatus.NOT_FOUND);
        //retornar a produto caso ela exista
        return produto

        //select * from tb_produto_where id = valor digitado;
    }
    async findByNome(nome: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                nome: ILike(`%${nome}%`),
            
            }
        })
        //select * from tb_postagens where titulo LIKE '%titulo%';
    }
    async create (produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto);
    }
    // insert into tb_postagens(titulo, texto data) values (?,?, server)
    async update (produto: Produto): Promise<Produto>{
        let buscaProduto : Produto = await this.findById(produto.id);

        if(!buscaProduto || !produto.id)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.save(produto);
        // update tb_postagens set titulo =?, texto=?, data= server where id = ?;    
    }
    async delete(id:number):Promise<DeleteResult>{
        let buscaProduto: Produto = await this.findById(id);

        if(!buscaProduto)
            throw new HttpException('Produto não foi encontrada!', HttpStatus.NOT_FOUND)
        return await this.produtoRepository.delete(id);
    }
}