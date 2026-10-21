Attribute VB_Name = "SlideToolsLayoutGrid"
Option Explicit

' Native guides for the customer layout: 12 columns with 0.4 cm gutters.
' Distances below are centimetres; converted to PowerPoint points internally.
Private Const GRID_COLUMNS As Long = 12
Private Const LEFT_CM As Double = 1.93
Private Const RIGHT_CM As Double = 1.93
Private Const TOP_CM As Double = 4.93
Private Const BOTTOM_CM As Double = 2.36
Private Const GUTTER_CM As Double = 0.4
Private Const PT_PER_CM As Double = 72 / 2.54

Public Sub CreateLayoutGrid()
    Dim deck As Presentation
    Dim guides As Object
    Dim added As Collection
    Dim guide As Object
    Dim cellWidth As Double, usableHeight As Double
    Dim x As Double
    Dim col As Long, i As Long
    Dim problem As String

    On Error GoTo Failed
    Set added = New Collection
    If Presentations.Count = 0 Then
        MsgBox "Open a presentation first.", vbInformation, "Layout Grid"
        Exit Sub
    End If
    Set deck = ActivePresentation

    If GRID_COLUMNS < 1 Or LEFT_CM < 0 Or RIGHT_CM < 0 Or TOP_CM < 0 Or BOTTOM_CM < 0 Or GUTTER_CM < 0 Then
        Err.Raise vbObjectError + 1000, , "Column count must be positive; margins and gutters cannot be negative."
    End If
    cellWidth = (deck.PageSetup.SlideWidth - (LEFT_CM + RIGHT_CM + (GRID_COLUMNS - 1) * GUTTER_CM) * PT_PER_CM) / GRID_COLUMNS
    usableHeight = deck.PageSetup.SlideHeight - (TOP_CM + BOTTOM_CM) * PT_PER_CM
    If cellWidth <= 0 Or usableHeight <= 0 Then
        Err.Raise vbObjectError + 1001, , "The margins and gutters are too large for this slide size."
    End If

    ' Late binding gives a useful error on PowerPoint versions without Guides.
    Set guides = CallByName(deck, "Guides", VbGet)
    For col = 0 To GRID_COLUMNS - 1
        x = LEFT_CM * PT_PER_CM + col * (cellWidth + GUTTER_CM * PT_PER_CM)
        AddGuideIfMissing guides, ppVerticalGuide, x, added
        AddGuideIfMissing guides, ppVerticalGuide, x + cellWidth, added
    Next col
    AddGuideIfMissing guides, ppHorizontalGuide, TOP_CM * PT_PER_CM, added
    AddGuideIfMissing guides, ppHorizontalGuide, deck.PageSetup.SlideHeight - BOTTOM_CM * PT_PER_CM, added

    MsgBox GRID_COLUMNS & " columns created with " & GUTTER_CM & " cm gutters." & vbCrLf & _
        "Column width: " & Format(cellWidth / PT_PER_CM, "0.00") & " cm." & vbCrLf & _
        "Margins (cm): left " & LEFT_CM & ", right " & RIGHT_CM & ", top " & TOP_CM & ", bottom " & BOTTOM_CM & "." & vbCrLf & _
        "Added " & added.Count & " guides; existing guides were kept." & vbCrLf & vbCrLf & _
        "Turn on Guides in the View menu if they are hidden.", vbInformation, "Layout Grid"
    Exit Sub

Failed:
    problem = Err.Description
    ' Roll back only the guides added by this run if creation fails.
    On Error Resume Next
    For i = added.Count To 1 Step -1
        Set guide = added(i)
        guide.Delete
    Next i
    On Error GoTo 0
    MsgBox "Could not create the grid: " & problem & vbCrLf & vbCrLf & _
        "This macro requires desktop PowerPoint with VBA drawing-guide support.", vbExclamation, "Layout Grid"
End Sub

Private Sub AddGuideIfMissing(ByVal guides As Object, ByVal orientation As Long, _
    ByVal position As Double, ByVal added As Collection)
    Dim guide As Object
    Dim i As Long
    ' PowerPoint rounds guide coordinates; tolerate a small rounding difference.
    For i = 1 To guides.Count
        Set guide = guides.Item(i)
        If guide.Orientation = orientation Then
            If Abs(CDbl(guide.Position) - position) < 0.05 Then Exit Sub
        End If
    Next i
    Set guide = guides.Add(orientation, CSng(position))
    added.Add guide
End Sub
