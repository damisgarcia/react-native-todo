package br.com.react_native_todo;

import android.content.Intent;
import android.os.Bundle;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactPackage;
import com.facebook.CallbackManager;

import java.util.Arrays;
import java.util.List;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends MultiDexApplication {
  // Needed for `react-native link`
  public List<ReactPackage> getPackages(CallbackManager mCallbackManager) {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add cool native modules

        // Needed for `react-native link`
        // new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new FBSDKPackage(mCallbackManager),
          new VectorIconsPackage()
    );
  }
}
