import express from 'express';
import morgan from 'morgan';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';

const app = express();

app.use(morgan('dev'));

const services = ['public', 'auth'];

services.forEach((service) => {
  const serviceName = service.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  const path = '/' + service.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

  app.use(
    path,
    createProxyMiddleware({
      target: `http://${serviceName}`,
      ws: true,
      selfHandleResponse: true,
      pathRewrite: {
        [`^${path}`]: '',
      },
      onProxyRes: responseInterceptor(
        async (responseBuffer, proxyRes, req, res) => {
          res.setHeader('access-control-allow-origin', ['*']);
          res.setHeader('access-control-allow-headers', '*');
          res.setHeader('access-control-allow-credentials', 'true');
          res.setHeader(
            'access-control-allow-methods',
            'GET,POST,PUT,PATCH,DELETE'
          );

          if (res.statusCode >= 400) {
            try {
              const json = JSON.parse(responseBuffer.toString('utf8'));
              console.log(JSON.stringify(json, null, 2));
            } catch (err) {}
          }

          return responseBuffer; // manipulate response and return the result
        }
      ),
    })
  );
});

app.use((req, res) => {
  res.status(404).json({
    message: 'No services to proxy',
  });
});

app.listen(80);

export default app;
