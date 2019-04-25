require 'json';

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "RNSafePadding"
  s.version      = package['version']
  s.summary      = package['description']
  s.description  = <<-DESC
                  RNSafePadding
                   DESC
  s.homepage     = "https://github.com/sharingapples/widgets"
  s.license      = "MIT"
  s.license      = package['license']
  s.author       = { "Ranjan Shrestha" => "ranjan@sharingapples.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/sharingapples/widgets.git", :tag => "master" }
  s.source_files = "packages/SafePadding/ios/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
  #s.dependency "others"
end

