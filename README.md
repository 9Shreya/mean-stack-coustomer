# Docker implemented 
take a pull and in integrated terminal give

1. docker-compose up --build  

if will not work or some error then

1. docker-compose up --build --remove-orphans

1. cd AngularApp
2. npm i
3. cd NodeJS
4. npm i


then again 
run 

1. docker-compose up --build  

for pushing images in docker first check they are build or not

1. docker images
2. docker tag repositoryName yourDockerID/repositoryName
3. docker push yourDockerID/repositoryName

or this can be done directly after installing docker extension in visual studio
right click select command pallet then write
1. Docker:image push on top search then
2. select repository name then eg:projectmeanstack_express(repositoryName) then write your 
3. docker username then write 
4. password then 
5. projectmeanstack_express(repositoryName)

Now you can check in dockerHub it will be there
