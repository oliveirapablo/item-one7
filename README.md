# item-one7
Tecnologias e boas práticas
 - Como metodoligia de desenvolvimento foi utilizado o TDD.
 - Como arquitetura tentei segui ao máximo o Clean Architecture e DDD para desacoplar os componentes
 - Utilizei uma imagem Docker do Redis com cache para ter melhor desempenho em resposta para cliente e toda vez que um item é incluso, atualizado ou deletado também é atualiado no cache.
 - Utilizei uma imagem Docker do MongoDB como banco de dados para o MS.
 - Utilizei uma imagem Docker do Kafka para serviço de mensageria, que atualiza a quantidade de um item na base toda vez que um item for adicionado a um pedido (outro MS)

SETUP 
- Clone o projeto
- Execute os comandos abaixo para preparar a infraestrutura das imagens para o Kafka, Redis e MongoDB:
  docker-compose -f docker/kafka/docker-compose.yaml up -d &&
  docker-compose -f docker/mongodb/docker-compose.yaml up -d &&
  docker-compose -f docker/redis/docker-compose.yaml up -d
- Execute o comando npm install no terminal para instalar as dependências
- Para ver a documentação swagger com os endpoints, copie o conteúdo do arquivo swagger-item.yml na raiz do projeto e cole do no swagger editor
- Para verificar a cobertura de test execute o comando npm run test, npm run test:ci ou npm run test:verbose
- Para executar o projeto em desenvolvimento execute o comando npm run dev
- Para gerar um pacote do projeto execute npm rum build que será gerado uma pasta ./dist na raiz
- Para rodar o pacote aplicação para produção execute o comando npm start
