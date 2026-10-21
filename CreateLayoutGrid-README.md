# PowerPoint layout grid macro

Creates the customer layout from your annotated screenshot: **12 columns**, **0.4 cm gutters**, **1.93 cm left/right margins**, **4.93 cm top margin** (3.03 + 1.90), and **2.36 cm bottom margin**.

Native guides mark both edges of every column, including both sides of each internal gutter, plus the top and bottom of the content area: **24 vertical and 2 horizontal guides**. There are no internal row guides. Guides apply throughout the presentation and do not appear in slide shows or exports.

## Install and run on Mac

1. Open the target presentation in desktop PowerPoint and save it as a **PowerPoint Macro-Enabled Presentation (.pptm)** if you want to keep the macro.
2. Open **Tools > Macro > Visual Basic Editor**.
3. Select your presentation's VBA project. If the previous `SlideToolsLayoutGrid` module is installed, replace its contents with the updated file (omit the first `Attribute VB_Name` line when pasting). Otherwise choose **File > Import File** and select `CreateLayoutGrid.bas`.
4. Return to PowerPoint. Open **Tools > Macro > Macros**, select **CreateLayoutGrid**, and click **Run**.
5. Enable drawing guides using **View > Guides** (the precise menu wording varies by version).

On Windows, open the VBA editor with **Alt+F11**, import the module, then run `CreateLayoutGrid` using **Alt+F8**.

If importing is unavailable, choose **Insert > Module** in the VBA editor and paste the file contents, omitting the first `Attribute VB_Name` line.

## Customise

Edit the constants at the top of the module. Measurements are in centimetres and are converted to points internally. The macro reads the presentation's actual slide size. On a standard 960 x 540 pt widescreen slide, columns are approximately 2.13 cm wide and the content area is 11.76 cm high.

Existing guides are preserved. Running the same grid again skips guides already at those positions. If you change the settings, earlier guides remain; delete unwanted guides in PowerPoint before generating the replacement grid. Master/layout guides are also left untouched.

The tutorial shows a #777777 colour setting. This macro uses PowerPoint's default guide colour because the documented VBA Guide API does not expose a colour setter. It creates actual guides, not drawn lines.

## Validation and compatibility

The coordinate calculations were checked for margins, gutter widths and the expected 24 vertical plus 2 horizontal guide positions. The implementation uses Microsoft's documented [Guides.Add API](https://learn.microsoft.com/en-us/office/vba/api/powerpoint.guides.add). It has not been executed in PowerPoint on this computer. PowerPoint for the web cannot run VBA; desktop versions must expose the drawing-guide API. The macro reports an error and attempts to remove only its newly added guides if creation fails.
