
# react-native-safe-padding

## Getting started

`$ npm install react-native-safe-padding --save`

### Mostly automatic installation

`$ react-native link react-native-safe-padding`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-safe-padding` and add `RNSafePadding.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNSafePadding.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNSafePaddingPackage;` to the imports at the top of the file
  - Add `new RNSafePaddingPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-safe-padding'
  	project(':react-native-safe-padding').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-safe-padding/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-safe-padding')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNSafePadding.sln` in `node_modules/react-native-safe-padding/windows/RNSafePadding.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Safe.Padding.RNSafePadding;` to the usings at the top of the file
  - Add `new RNSafePaddingPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNSafePadding from 'react-native-safe-padding';

// TODO: What to do with the module?
RNSafePadding;
```
  