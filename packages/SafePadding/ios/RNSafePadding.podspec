
Pod::Spec.new do |s|
  s.name         = "RNSafePadding"
  s.version      = "0.1.0"
  s.summary      = "RNSafePadding"
  s.description  = <<-DESC
                  RNSafePadding
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "Ranjan Shrestha" => "ranjan@sharingapples.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/sharingapples/widgets.git", :tag => "master" }
  s.source_files  = "packages/SafePadding/ios/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
  #s.dependency "others"

end

