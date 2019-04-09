
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
#import "RNSafePadding.h"

@implementation RNSafePadding

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_EXPORT_MODULE()


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
    @"top": @(topMargin),
    @"bottom": @(bottomMargin)
  };
}

@end
