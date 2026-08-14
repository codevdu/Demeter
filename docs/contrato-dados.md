# Contrato de Dados entre Camadas

Este documento define o formato dos dados trocados entre o serviço de Dados, o backend e o frontend do projeto Deméter.

## KPIs do Produtor

Os KPIs representam os principais indicadores exibidos no dashboard do produtor rural.

### Estrutura esperada

```json
{
  "kpis": {
    "produtividade_media": 142.4,
    "variacao_producao": 8.2,
    "chuva_acumulada": 648
  }
}
```

### Campos

* `produtividade_media`

  * Tipo: `number`
  * Unidade: `sc/ha`
  * Descrição: produtividade média da cultura no período analisado.

* `variacao_producao`

  * Tipo: `number`
  * Unidade: `%`
  * Descrição: variação percentual da produção em relação ao período de referência.

* `chuva_acumulada`

  * Tipo: `number`
  * Unidade: `mm`
  * Descrição: volume acumulado de chuva no período analisado.


## GET /dados

A rota `/dados` é responsável por fornecer ao backend os dados utilizados pelo frontend.

### Exemplo de resposta

```json id="zq9d0g"
{
  "pontos": [
    {
      "ano": 2020,
      "chuva": 812.4,
      "produtividade": 2.7
    }
  ],
  "kpis": {
    "produtividade_media": 142.4,
    "variacao_producao": 8.2,
    "chuva_acumulada": 648
  }
}
```

### Tipos esperados

* `pontos`: `array`
* `ano`: `number`
* `chuva`: `number`
* `produtividade`: `number`
* `kpis`: `object`
* `produtividade_media`: `number`
* `variacao_producao`: `number`
* `chuva_acumulada`: `number`
