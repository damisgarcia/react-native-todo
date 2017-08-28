package br.com.react_native_todo;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import br.com.react_native_todo.generated.ExponentBuildConstants;
import host.exp.expoview.ExponentActivity;

public class MainActivity extends ExponentActivity {
  CallbackManager mCallbackManager;

  @Override
  public String publishedUrl() {
    return "exp://exp.host/@damisgarcia/react-native-todo";
  }

  @Override
  public String developmentUrl() {
    return ExponentBuildConstants.DEVELOPMENT_URL;
  }

  @Override
  public List<String> sdkVersions() {
    return new ArrayList<>(Arrays.asList("17.0.0"));
  }

  @Override
  public List<ReactPackage> reactPackages() {
    mCallbackManager = new CallbackManager.Factory().create();
    return ((MainApplication) getApplication()).getPackages(mCallbackManager);
  }

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @Override
  public Bundle initialProps(Bundle expBundle) {
    // Add extra initialProps here
    return expBundle;
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
      super.onActivityResult(requestCode, resultCode, data);
      mCallbackManager.onActivityResult(requestCode, resultCode, data);
  }
}
