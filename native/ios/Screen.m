//
//  Screen.m
//  Lodging
//
//  Created by Ranjan Shrestha on 1/29/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "Screen.h"

@implementation Screen

RCT_EXPORT_MODULE();


+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSDictionary *)constantsToExport
{
  CGFloat topMargin = 20.0;   // By default the statusBar has always been 20dp
  CGFloat bottomMargin = 0.0; // By default there hasn't been any requirement for bottom spacing
  
  if (@available(iOS 11.0, *)) {
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    topMargin = window.safeAreaLayoutGuide.layoutFrame.origin.y;
    bottomMargin = window.frame.size.height - window.safeAreaLayoutGuide.layoutFrame.size.height - topMargin;
  }
  
  return @{
    @"topMargin": @(topMargin),
    @"bottomMargin": @(bottomMargin)
  };
}

@end
