import { HttpClient } from '@angular/common/http';
import { Cidade } from './model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  cidadesURL = 'http://localhost:8080/cidades';

  urlFiltro;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Promise<any> {
    if(filtro.nome){
      this.urlFiltro = 'http://localhost:8080/cidades/filtro?nome='+filtro.nome;
    }else{
      this.urlFiltro = 'http://localhost:8080/cidades';
    }

    return this.http.get<any>(this.urlFiltro).toPromise();
  }

  excluir(id:number):Promise<void>{
    return this.http.delete(this.cidadesURL+'/'+id)
    .toPromise()
    .then(() => null);
  }

  adicionar(cidade: Cidade): Promise<any>{
    return this.http.post(this.cidadesURL, cidade)
    .toPromise();
  }

  alterar(cidade: Cidade): Promise<any>{
    return this.http.put(this.cidadesURL+'/'+cidade.id, cidade)
    .toPromise();
  }

  buscarPorCodigo(codigo: number): Promise<Cidade> {
    return this.http.get<Cidade>(this.cidadesURL+'/'+codigo).toPromise();
  }

}
