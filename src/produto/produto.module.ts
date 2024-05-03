import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "../categoria/categoria.module";
import { CategoriaService } from "../categoria/services/categoria.service";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";
import { produtoController } from "./controllers/produto.controller";
@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    providers: [ProdutoService, CategoriaService],
    controllers: [produtoController],
    exports: [TypeOrmModule]
})

export class ProdutoModule{ }