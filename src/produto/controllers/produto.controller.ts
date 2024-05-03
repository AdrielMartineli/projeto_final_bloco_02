import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller("/produtos")

export class produtoController{

        constructor(private readonly produtoService: ProdutoService){}

        @Get()
        @HttpCode(HttpStatus.OK) //http status 200

        findAll(): Promise<Produto[]>{
            return this.produtoService.findAll();
        }
        @Get('/:id')
        @HttpCode(HttpStatus.OK) //http status 200
        findById(@Param('id', ParseIntPipe)id: number): Promise<Produto>{
            return this.produtoService.findById(id);
        }
        @Get('/nome/:nome')
        @HttpCode(HttpStatus.OK) //http status 200
        findByNome(@Param('nome')nome: string): Promise<Produto[]>{
            return this.produtoService.findByNome(nome);
        }
        @Post()
        @HttpCode(HttpStatus.CREATED) //http status 201
        create(@Body() produto:Produto): Promise<Produto>{
            return this.produtoService.create(produto);
        }
        @Put()
        @HttpCode(HttpStatus.OK) 
        update(@Body() produto:Produto): Promise<Produto>{
            return this.produtoService.update(produto);
        }
        @Delete('/:id')
        @HttpCode(HttpStatus.NO_CONTENT) //http status 204
        delete(@Param('id', ParseIntPipe)id: number){
            return this.produtoService.findById(id);
        }
}