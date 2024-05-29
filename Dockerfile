FROM nginx
COPY build /react
# dist /react 안에 있는 파일을 default.conf에 덮어쓰겠다 (경로)
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80