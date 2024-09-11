rootProject.name = "services"

pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

include(
    "services:config",
	"services:discovery",
	"services:gateway",
)
