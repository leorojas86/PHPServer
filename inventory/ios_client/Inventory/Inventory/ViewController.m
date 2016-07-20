//
//  ViewController.m
//  Inventory
//
//  Created by Leo on 3/29/16.
//  Copyright © 2016 Leo. All rights reserved.
//

#import "ViewController.h"

#define WEB_SITE_URL @"http://201.200.1.187/inventory/html_client/index.html"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.webview.delegate = self;
    
    [self loadWebSite];
}

- (void)webViewDidFinishLoad:(UIWebView *)theWebView
{
    /*CGSize contentSize = theWebView.scrollView.contentSize;
    CGSize viewSize = theWebView.bounds.size;
    
    float rw = viewSize.width / contentSize.width;
    
    theWebView.scrollView.minimumZoomScale = rw;
    theWebView.scrollView.maximumZoomScale = rw;
    theWebView.scrollView.zoomScale = rw;*/
    
    /*self.webview.scalesPageToFit = YES;
    self.webview.contentMode = UIViewContentModeScaleAspectFit;*/
    
    /*NSString* jsCommand = [NSString stringWithFormat:@"document.body.style.zoom = 0.3;"];
    [self.webview stringByEvaluatingJavaScriptFromString:jsCommand];
*/
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(nullable NSError *)error
{
    UIAlertController* alert = [UIAlertController alertControllerWithTitle:@"Connection Error"
                                                                   message:@"Failed to contact servers, please check your internet connection and try again."
                                                            preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"Retry" style:UIAlertActionStyleDefault
                                                          handler:^(UIAlertAction * action) { [self loadWebSite]; }];
    
    [alert addAction:defaultAction];
    [self presentViewController:alert animated:YES completion:nil];
}

- (void)loadWebSite
{
    NSURLRequest* urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:WEB_SITE_URL]];
    [self.webview loadRequest:urlRequest];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (BOOL)prefersStatusBarHidden
{
    return YES;
}

@end
