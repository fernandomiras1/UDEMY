![Imgur](https://i.imgur.com/MksBQJt.png)



link: https://account.mapbox.com/
user : fernandomiras1
email : fernando.miras.pc@gmail.com
passs: map36354931
Usuario: Miras
Contraseña: Fernando31456

```
npx cap add android
npx cap add ios
npx cap open ios
```

```typescript
async initializeApp() {
  const { SplashScreen, StatusBar } = Plugins;
  try {
    await SplashScreen.hide();
    await StatusBar.setStyle({ style: StatusBarStyle.Light });
    if (this.platform.is('android')) {
      StatusBar.setBackgroundColor({ color: '#CDCDCD' });
    }
  } catch (err) {
    console.log('This is normal in a browser', err);
  }
}
```

```typescript
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

```
ng build --prod
npx cap copy
npx cap open android
npx cap open ios
```