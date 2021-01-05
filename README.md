# EMR (Electronic Medical Record)

EMR is project developed by EMR team of [ISOFH](https://isofh.com/)

### Run
`yarn` install dependencies

`yarn start` run local for development

##### env.staging MAT
```
   NODE_PATH                 = src/
   REACT_APP_URL_LAN         = http://
   REACT_APP_URL_NGHIEM_THU  = http://
   REACT_APP_URL_DOMAIN      = http://
   REACT_APP_HOST            = http://10.0.0.93:2701/
   REACT_APP_HOST_LAN        = http://
   REACT_APP_HOST_NGHIEM_THU = http://
   REACT_APP_HOST_DOMAIN     = http://
   REACT_APP_DB_VERSION      = development
   REACT_APP_APP             = MAT
   REACT_APP_SHOW_SURGERY    = true
   REACT_APP_DOCUMENT_LINK   = /documentations/index.html
   GENERATE_SOURCEMAP        = false
   REACT_APP_HIDE_SIGNER     = false
   REACT_APP_PDF_HOST        = http://10.0.0.94:9999/
   REACT_APP_PDF_HOST_DOMAIN = https://
   REACT_APP_TITLE           = Bệnh Viện Mắt Trung Ương
   REACT_APP_SC_DISABLE_SPEEDY = true
```

##### env.staging 110

```
    NODE_PATH                 = src/
    REACT_APP_URL_LAN         = http://
    REACT_APP_URL_NGHIEM_THU  = http://
    REACT_APP_URL_DOMAIN      = http://
    REACT_APP_HOST            = https://110.api.emr.test.isofh.vn/
    REACT_APP_HOST_LAN        = http://
    REACT_APP_HOST_NGHIEM_THU = http://
    REACT_APP_HOST_DOMAIN     = http://
    REACT_APP_DB_VERSION      = development
    REACT_APP_APP             = 110
    REACT_APP_SHOW_SURGERY    = true
    REACT_APP_DOCUMENT_LINK   = /documentations/index.html
    GENERATE_SOURCEMAP        = false
    REACT_APP_HIDE_SIGNER     = false
    REACT_APP_PDF_HOST        = http://10.0.0.94:9999/
    REACT_APP_PDF_HOST_DOMAIN = https://
    REACT_APP_TITLE           = Bệnh Viện Quân Y 110
    REACT_APP_SC_DISABLE_SPEEDY = true
```   

##### env.staging ĐHY

```
    NODE_PATH                 = src/
    REACT_APP_URL_LAN         = http://
    REACT_APP_URL_NGHIEM_THU  = http://
    REACT_APP_URL_DOMAIN      = http://
    REACT_APP_HOST            = https://api.emr.test.isofh.vn/
    REACT_APP_HOST_LAN        = http://
    REACT_APP_HOST_NGHIEM_THU = http://
    REACT_APP_HOST_DOMAIN     = http://
    REACT_APP_DB_VERSION      = development
    REACT_APP_APP             = DHY
    REACT_APP_SHOW_SURGERY    = true
    REACT_APP_DOCUMENT_LINK   = /documentations/index.html
    GENERATE_SOURCEMAP        = false
    REACT_APP_HIDE_SIGNER     = false
    REACT_APP_PDF_HOST        = http://10.0.0.94:9999/
    REACT_APP_PDF_HOST_DOMAIN = https://
    REACT_APP_TITLE           = Bệnh Viện Đại Học Y Hà Nội
    REACT_APP_SC_DISABLE_SPEEDY = true
```


### Technical

- Extended from [Create-React-App](https://reactjs.org/docs/create-a-new-react-app.html)
- Implement [Antd 3x](https://3x.ant.design/) design system for react app
- Use [Rematch](https://rematch.github.io/rematch/#/) for global data

##### Variables conventions

- We choose camelCase to create name for variables. Because it's common rule on community.
    
    Just read [Javascript naming conventions](https://www.robinwieruch.de/javascript-naming-conventions) to know more info
    
### Idea

Two functions on project need to be development

- Create and config form
- Business functions implementations
    
### Business

[Documentations](https://conf.isofh.com.vn/display/IH/iSofH+EMR+Home)

