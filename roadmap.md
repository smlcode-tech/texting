## 1. **İstemci uygulaması**
Web, mobil veya masaüstü istemci:

- **Web:** React, Vue veya Angular
- **Mobil:** Flutter, React Native, Kotlin veya Swift
- **Mesaj gönderme/alma:** WebSocket
- **HTTP işlemleri:** REST veya GraphQL
- **Yerel mesaj önbelleği:** SQLite, IndexedDB ´´´veya Realm
- **Bildirim:** FCM ve Apple Push Notification Service

> İstemci, uygulama açıkken WebSocket bağlantısını kullanır. Uygulama arka plandayken push notification sistemi devreye girer.

## 2. Kimlik doğrulama
Kullanıcıların sisteme giriş yapması gerekir:

- E-posta/şifre
- Telefon numarası ve SMS doğrulama
- **OAuth:** Google, Apple vb.
- Access token ve refresh token
- JWT veya sunucu taraflı session


Tipik akış:

´´´
Kullanıcı giriş yapar
        |
Sunucu access token üretir
        |
İstemci WebSocket bağlantısı açar
        |
Token ile kimliğini doğrular
´´´