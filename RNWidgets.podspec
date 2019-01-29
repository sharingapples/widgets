require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name = "RNWidgets"
  s.version = package['version']
  s.summary = package['description']
  s.homepage = "https://github.com/bhoos/widgets"
  s.source = { :git => 'https://github.com/bhoos/widgets.git', :tag => "v#{s.version}" }
  s.license = package['license']
  s.author = package['author']
  s.platform = :ios, "8.0"

  s.dependency 'React/Core'

  s.source_files = "native/ios/*.{h,m}"
end
