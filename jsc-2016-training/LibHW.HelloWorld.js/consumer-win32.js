import System.Windows.Forms; // this has a MessageBox class
import LibHW.HelloWorld; // LibHW.HelloWorld.dll

var hw = new LibHW.HelloWorld();
MessageBox.Show(
    hw.run(),
    "Dude!",
    MessageBoxButtons.OK,
    MessageBoxIcon.Exclamation
);