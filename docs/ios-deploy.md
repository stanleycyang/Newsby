# Deployment: iOS

We are now at a point where our app is ready and we can deploy it to the App Store! There are just a few final hurdles to get the app out to the world for people to enjoy.


**Lesson 7 Objectives:**

- Sign up for a Apple Developer Account
- Create certificates & provisioning profile
- Bundle the application
- Push to TestFlight

**Apple Developer Account:**

**Signing up:** You will need to pay Apple for the privilege of submitting an app to the store. [Here](https://www.raywenderlich.com/127936/submit-an-app-part-1) is a great article to help you get set up.

**Personal vs. Business:** You can either sign up for a personal account or a business account. You will need a registered business with a [DUNS](http://www.dnb.com/duns-number.html) number to register as a business with Apple. The entity that you are signed up under (either personal or business) will be the name displayed under the app, so make the correct decision for your specific use case.

**Deployment Checklist:**

- Create Apple Developer account (personal / business)
- Test out the app on your iPhone
- Add app icon into XCode
- Bundle the app and run it on an iPhone
- Submit a build and test it internally with TestFlight
- Test the app with external testers with TestFlight
- Add screenshots and information for an official release


**Certificates, ID, and Profiles**

You may already know that non-jailbroken iOS device is only able to run apps approved by Apple and installed through the App Store.

Apple achieves this by requiring that every app run by iOS has a signed Apple Certificate. The system will verify the signature in order to run. If the signature does not exist or is invalid, then the app won't run.

There are two types of profiles:

**Development profiles:** These are tied to specific devices to test in development, so the app can run on them

**Distribution profiles:** These are used to sign the app before it is submitted to the App Store for approval. 

**Provisoning Profiles**

A provisioning profile is a collection of digital entities that uniquely ties developers and devices to an authorized iPhone Development Team. 

A provisioning profile joins all the pieces together at this point. 

Follow [this](https://www.raywenderlich.com/127936/submit-an-app-part-1) tutorial to set up your certificates and provisioning profiles to continue on.

**Run Newsby on your device**

When you are finished setting up [certificates and provisioning profiles](https://www.raywenderlich.com/127936/submit-an-app-part-1), create the App ID for your application on [iTunes Connect](https://itunesconnect.apple.com/), run your app locally on your personal iPhone.

**Note:** App ID are unique, and you cannot use a name that someone else has already claimed.

**Add App Icons**

In your XCode, click on `Images.xcassets` and add in the App Icons for Newsby ([download here](https://github.com/stanleycyang/Newsby/tree/master/docs/imgs/workshop/appicon/ios/AppIcon.appiconset)):

![Generic](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l7/add-icons.png)

Plug them in according to their sizing and it will show up!

**Bundling the app for production**

If everything is working great, then you are ready to bundle and push it to the app store.

You will want to run the following command in the root of the Newsby directory:

```js
$ npm run build-ios
```

This will run the bundle command of:

```js
react-native bundle --platform ios --entry-file index.ios.js --bundle-output ./main.jsbundle --assets-dest ./ --dev false
```
When everything is bundled and ready to go, you can push it up to the App Store and test it internally on TestFlight.

**Pushing to TestFlight**

Open up your XCode for Newsby:

```bash
$ open ios/Newsby.xcodeproj
```

Switch to **Generic iOS Device**

![Generic](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l7/generic.png)

Archive the app:

![Archive](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l7/archive.png)

Open the Organizer:

![Organizer](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l7/organizer.png)

Upload to App Store:

![Upload](https://raw.githubusercontent.com/stanleycyang/Newsby/master/docs/imgs/workshop/l7/upload.png)

Now go to [iTunes Connect](https://itunesconnect.apple.com/) and select the version for Internal Testing!

When you are ready to release it to an audience, you can release it for **External Testing** and add the emails of your testers. This will need to be approved by Apple so it may take up to a week of back and forth.

When your app is ready, you can add all relevant information and release it for your audience to use! 

By the end of this lesson, you should have:

- Signed up for a Apple Developer Account
- Created certificates & provisioning profile
- Bundled the application
- Pushed to TestFlight

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/ios-deploy.md).