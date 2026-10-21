Attribute VB_Name = "SlideToolsDuplicate"
Option Explicit
Public Sub DuplicateInPlace()
    Dim original As ShapeRange, copies As ShapeRange
    Dim savedLeft As Single, savedTop As Single
    On Error GoTo Failed
    If Presentations.Count = 0 Then Exit Sub
    If ActiveWindow.Selection.Type <> ppSelectionShapes Then
        MsgBox "Select objects on the slide first.", vbInformation, "Slide Tools"
        Exit Sub
    End If
    Set original = ActiveWindow.Selection.ShapeRange
    savedLeft = original.Left
    savedTop = original.Top
    Set copies = original.Duplicate
    copies.Left = savedLeft
    copies.Top = savedTop
    copies.Select
    Exit Sub
Failed:
    MsgBox "Duplicate in place could not finish: " & Err.Description, vbExclamation, "Slide Tools"
End Sub
