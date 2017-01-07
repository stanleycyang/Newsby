# Deployment: Android

Deploying an Android application to the Google Play Store is a fairly simple and painless process. Here are some terms you should understand before we get started:

**APK:**

Similar to a Window's .exe or iOS's .ipa, .apk is simply a Android file format it knows how to execute.

**Keystore File:**

This is essentially an identifier for you that shows you are authorized to publish a new version of that app. Make sure you keep your keystore file secure.

**Gradle:**

Gradle is a build tool that Android uses to do all the heavy lifting for us behind the scenes. 

**Lesson 8 Objectives:**

- Sign up for Google Play Developer Account
- Generate keystore file
- Setup Google developer account
- Package Android APK
- Deploy to the Google Play Store

**Google Play Developer Account**

You will need to sign up for an account to publish to the Google Play store.

Follow [this](https://developer.android.com/distribute/googleplay/start.html) guide to get signed up.

**Adding app icons:**

Download the android icons [here](https://github.com/stanleycyang/Newsby/tree/master/docs/imgs/workshop/appicon/android).

Add `ic_launcher.png` to the `[PrjDir]/android/app/src/main/res/mipmap-*` folder:

- `72*72` `ic_launcher.png` to `mipmap-hdpi`.
- `48*48` `ic_launcher.png` to `mipmap-mdpi`.
- `96*96` `ic_launcher.png` to `mipmap-xhdpi`.
- `144*144` `ic_launcher.png` to `mipmap-xxhdpi`.

Now your app icons are added for your Android app!

**Generate keystore file:**

```bash
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

It will ask for a password and to confirm the password (make sure you remember the password or store it in a safe location).

Then it will ask you for some identifying information to add to the keystore:

- Fire name / Last name
- Organizational unit
- Name of Organization
- Name of city
- Name of state
- Two-letter country code

At the end of this process, it will prompt for another password. Press *enter* if you want to use the same password as the keystore.

Once you finish this process, you now have a production keystore file you can use to publish your Android app!

Remember -- Your keystore will be valid for 10,000 days. 

**Adding the Keystore to the app**

Depending on where you created your keystore file, you will want to put a copy of the file into `Newsby/android/app`.

You will also want to update your `.gitignore` to avoid committing your keystore to source control.

Once you finish the previous part, go ahead and make sure your global `~/.gradle/gradle.properties` has a few variables to use. This will NOT be in the `grade.properties` file in Newsby.

Use the file name, alias, and password you set up earlier:

```js
MY_APP_RELEASE_STORE_FILE=my-release-key.keystore
MY_APP_RELEASE_KEY_ALIAS=my-key-alias
MY_APP_RELEASE_STORE_PASSWORD=keystore-password
MY_APP_RELEASE_KEY_PASSWORD=keyalias-password
```

Then, modify the `android/app/build.gradle` file in Newsby to use those variables:

```js
...

defaultConfig {
    applicationId "com.awesomeproject"
    minSdkVersion 16
    targetSdkVersion 22
    versionCode 1
    versionName "1.0"
    ndk {
        abiFilters "armeabi-v7a", "x86"
    }
}
signingConfigs {
    release {
        storeFile file(MY_APP_RELEASE_STORE_FILE)
        storePassword MY_APP_RELEASE_STORE_PASSWORD
        keyAlias MY_APP_RELEASE_KEY_ALIAS
        keyPassword MY_APP_RELEASE_KEY_PASSWORD
    }
}
buildTypes {
  release {
    minifyEnabled enableProguardInReleaseBuilds
    proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    signingConfig signingConfigs.release // add this line as well
  }
}

...
```

Now that your keystore has been configured and added to your app, you are now ready to generate a production APK with the following command:

```bash
$ cd android && ./gradlew assembleRelease
```
Now you are ready to release it! The final apk you will upload to the Play Store will be in `Newsby/android/app/build/outputs/apk/`.

**Testing the build**

If you want to make sure everything is running okay, you can run:

```bash
$ cd android && ./gradlew installRelease
```

This will install the build on your android device. Make sure you either have your device connected of your emulator running. The installation will work as long as you have done the steps above correctly!

At the end of this lesson, you should have:

- Signed up for Google Play Developer Account
- Generated keystore file
- Setup Google developer account
- Packaged Android APK
- Deployed to the Google Play Store

View this lesson on [GitHub](https://github.com/stanleycyang/Newsby/blob/master/docs/android-deploy.md).