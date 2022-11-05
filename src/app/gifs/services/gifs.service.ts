import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial  : string[] = [];
  private apiKey      : string = '4xb6JpyXWL69k8a5bFyejLTwKeC1J41s';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];
  
  get historial(){
    //this._historial = this._historial.splice(0,9);
    return [...this._historial];
  }

  constructor ( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    //  if (localStorage.getItem('historial')){
        // this._historial = JSON.parse( localStorage.getItem('historial')! );
    //  }


  }

  buscarGifs( query: string = ''){

    query = query.trim().toLocaleLowerCase();
  
    if (!this._historial.includes( query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,9);

      localStorage.setItem('historial',JSON.stringify( this._historial ))
      
    }
    // console.log(this._historial);

    //fetch('https://api.giphy.com/v1/gifs/search?api_key=4xb6JpyXWL69k8a5bFyejLTwKeC1J41s&q=dragon ball z&limit=10')
    //.then( resp => {
    //  resp.json().then(data => {
    //      console.log(data)
    //  })
    //})

    const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('limit', '10')
                      .set('q', query);
    
    console.log( params.toString());
  
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( (resp ) => {
        // console.log( resp.data )
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      })

  }
}
