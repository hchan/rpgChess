C:\download\adt-bundle-windows-x86_64\sdk\platform-tools\adb -s 192.168.1.106:5555  uninstall com.rpgchess
C:\download\adt-bundle-windows-x86_64\sdk\platform-tools\adb -s 192.168.1.106:5555  -d install c:\workspace\rpgChess\bin\rpgChess-debug.apk

@REM to show emulators adb devices
@REM to add an emulator (such as android x86): adb connect 192.168.1.106:5555