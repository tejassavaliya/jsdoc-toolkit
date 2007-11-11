package org.jsdoctoolkit.view;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTree;
import javax.swing.UIManager;
import javax.swing.border.BevelBorder;
import javax.swing.border.EtchedBorder;
import javax.swing.border.TitledBorder;
import javax.swing.tree.DefaultTreeCellRenderer;

import org.jsdoctoolkit.image.IconFactory;
import org.jsdoctoolkit.model.MainModel;
import org.jsdoctoolkit.model.MyLogger;
import org.jvnet.substance.SubstanceLookAndFeel;
import org.jvnet.substance.theme.SubstanceRaspberryTheme;

public class MainFrame extends JFrame {

    /**
     * Comment for <code>serialVersionUID</code>
     */
    private static final long serialVersionUID = 6588748923047774108L;

    private static MainFrame instance;

    public MainFrame(String titre) {
        super(titre);
        MainModel mm = new MainModel();
        MainView mv = new MainView(mm);
        mv.init();

        add(mv);
        
        instance = this;
    }

    public static MainFrame getInstance() {
        return instance;
    }

    /**
     * Close application
     */
    private void close() {
        System.exit(0);
    }

    /** 
     * Lancement de l'application 
     */
    public static void main(String[] args) {
        MyLogger.getLogger().info("Start JsDoc Toolbox");

        JFrame.setDefaultLookAndFeelDecorated(true);
        JDialog.setDefaultLookAndFeelDecorated(true);
        try {
            UIManager.setLookAndFeel(new SubstanceLookAndFeel());
            SubstanceLookAndFeel.setCurrentTheme(new SubstanceRaspberryTheme());
/*
            SubstanceLookAndFeel.setCurrentWatermark(new ExtraBrushedMetalWatermark());
            SubstanceLookAndFeel.setCurrentButtonShaper(new ClassicButtonShaper());
            SubstanceLookAndFeel.setCurrentGradientPainter(new SpecularGradientPainter());*/
        } catch (Exception e) {
            //MyLogger.getLogger().severe(e.getMessage());
        }

        MainFrame f = new MainFrame("JsDoc ToolBox Project");

        f.pack();
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setSize(800, 600);
        f.setLocationRelativeTo(null);
        f.setVisible(true);
        ImageIcon img = IconFactory.getImageIcon("script", IconFactory.GIF);
        if(img!=null)
            f.setIconImage(img.getImage());

        MyLogger.getLogger().info("Stop JsDoc Toolbox");
    }
    
}
