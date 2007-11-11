package org.jsdoctoolkit.view;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JComboBox;
import javax.swing.JFileChooser;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.JTree;
import javax.swing.border.BevelBorder;
import javax.swing.border.EtchedBorder;

import org.jsdoctoolkit.image.IconFactory;
import org.jsdoctoolkit.model.MainModel;

public class MainView extends AbstractView implements ActionListener{
	
    /**
	 * 
	 */
	private static final long serialVersionUID = -3248050155278102004L;

	private JPanel mainFrame;
    
    private JTextArea console;
    
    private JPanel folderPanel;

    private JPanel wdPanel;
    
    private JPanel tplPanel;

    private JTextField tfWD;

    private JButton changeWD;
    
    private JTextField tfOD;

    private JButton changeOD;

    private JTree tree;
    

    public MainView(MainModel mm){
    	super(mm);
    }
    
    /**
     * 
     * 
     */
    public void init() {

        this.mainFrame = new JPanel();
        this.mainFrame.setLayout(new BorderLayout());

        /** Top Panel */
        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        JLabel logo = new JLabel(IconFactory.getImageIcon("jsdoctoolkit", IconFactory.PNG));
        topPanel.add(logo);
        this.mainFrame.add(topPanel, BorderLayout.NORTH);
        
        /** Main Panel */
        this.mainFrame.add(getJsDocPanel(), BorderLayout.CENTER);

        /** Bottom panel */
        this.mainFrame.add(getConsolePanel(), BorderLayout.SOUTH);

        add(this.mainFrame);
        
        loadDefaultValues();
    }

	private JPanel getJsDocPanel() {
        
        JPanel jsDocPanel = new JPanel(new GridBagLayout());
        
        
        GridBagConstraints gbc = new GridBagConstraints();
        
        gbc.gridy = 0;
        gbc.fill = GridBagConstraints.BOTH;
        gbc.anchor = GridBagConstraints.NORTHWEST;    
        jsDocPanel.add(createWDPanel(), gbc);

        gbc.gridx = 1;
        gbc.gridy = 0;   
        jsDocPanel.add(createTemplatePanel(), gbc); 
        
        gbc.gridx = 0;
        gbc.gridy = 1;   
        jsDocPanel.add(createFolderPanel(), gbc);     
        
        gbc.gridx = 1;
        gbc.gridy = 1;   
        jsDocPanel.add(createOptionsPanel(), gbc);  
        
        gbc.gridx = 0;
        gbc.gridy = 2;
        jsDocPanel.add(createODPanel(), gbc); 
        
        gbc.gridx = 1;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        jsDocPanel.add(new JButton("Start"), gbc); 
                
        return jsDocPanel;
    }
    
    
    private JPanel createWDPanel() {
        this.wdPanel = new JPanel();
        this.wdPanel.setLayout(new FlowLayout(FlowLayout.LEFT));

        this.wdPanel.setBorder(BorderFactory.createTitledBorder(new EtchedBorder(),"workingDirectory"));

        this.tfWD = new JTextField();
        this.tfWD.setEditable(false);
        Ressources.formatComponent(this.tfWD, 400);
        this.wdPanel.add(this.tfWD);

        this.changeWD = new JButton("open", IconFactory.getImageIcon("open",
                IconFactory.GIF));
        this.changeWD.addActionListener(this);

        this.wdPanel.add(this.changeWD);
        
        this.wdPanel.add(new JLabel("Recurse : "));
        JComboBox cbb = new JComboBox(new String[]{"0","1","2","3","4","5","6"});
        cbb.addActionListener(this);

        this.wdPanel.add(cbb);

        return this.wdPanel;
    }
    
    private JPanel createTemplatePanel() {
        this.tplPanel = new JPanel();
        this.tplPanel.setLayout(new FlowLayout(FlowLayout.LEFT));

        this.tplPanel.setBorder(BorderFactory.createTitledBorder(new EtchedBorder(),"Template"));
   
        JComboBox cbb = new JComboBox(((MainModel)getModel()).getTemplatesList());
        cbb.addActionListener(this);

        this.tplPanel.add(cbb);

        return this.tplPanel;
    }

    private JPanel createFolderPanel() {

        this.folderPanel = new JPanel();
        this.folderPanel.setLayout(new BorderLayout());
        this.folderPanel.setBorder(BorderFactory.createTitledBorder(new EtchedBorder(
                EtchedBorder.LOWERED), "File to parse"));

        this.tree = new JTree(((MainModel)getModel()).getTreeModel());
        this.tree.setRootVisible(true);
        this.tree.setBorder(BorderFactory.createBevelBorder(BevelBorder.LOWERED));
       // this.tree.setCellRenderer(new TreeFileCellRenderer());
        this.tree.setScrollsOnExpand(true);
        //this.tree.addMouseListener(this);
        //this.tree.addTreeSelectionListener(this);

        JScrollPane jsp = new JScrollPane(this.tree);

        this.folderPanel.add(jsp, BorderLayout.CENTER);

        //this.folderPanel.add(getActionsPanel(), BorderLayout.NORTH);

        folderPanel.setMaximumSize(new Dimension(400,100));
        folderPanel.setMinimumSize(new Dimension(400,100));
        folderPanel.setPreferredSize(new Dimension(400,100));
        
        return this.folderPanel;
    }
    
    private JPanel createOptionsPanel() {

        JPanel oPanel = new JPanel(new GridBagLayout());

        oPanel.setBorder(BorderFactory.createTitledBorder(new EtchedBorder(),"Options"));
        
        GridBagConstraints gbc = new GridBagConstraints();
        
        gbc.fill = GridBagConstraints.BOTH;
        gbc.anchor = GridBagConstraints.NORTHWEST;
        gbc.gridx = 0;
        gbc.gridy = 0;
        oPanel.add(new JCheckBox(), gbc);
        
        gbc.gridx = 0;
        gbc.gridy = 1;
        oPanel.add(new JCheckBox(), gbc);     
        
        gbc.gridx = 0;
        gbc.gridy = 2;
        oPanel.add(new JCheckBox(), gbc); 
        
        gbc.gridx = 1;
        gbc.gridy = 0;
        oPanel.add(new JLabel("Show private (-p)"), gbc);
        
        gbc.gridx = 1;
        gbc.gridy = 1;
        oPanel.add(new JLabel("Show ... (-a)"), gbc);     
        
        gbc.gridx = 1;
        gbc.gridy = 2;
        oPanel.add(new JLabel("Show ... (-A)"), gbc);  
        
        oPanel.setMaximumSize(new Dimension(200,100));
        oPanel.setMinimumSize(new Dimension(200,100));
        oPanel.setPreferredSize(new Dimension(200,100));
        
        return oPanel;
    }
    
    private JPanel createODPanel() {
        JPanel jp = new JPanel();
        jp.setLayout(new FlowLayout(FlowLayout.LEFT));

        jp.setBorder(BorderFactory.createTitledBorder(new EtchedBorder(),"Output Directory"));

        this.tfOD = new JTextField();
        this.tfOD.setEditable(false);
        Ressources.formatComponent(this.tfOD, 400);
        jp.add(this.tfOD);

        this.changeOD = new JButton("open", IconFactory.getImageIcon("open",
                IconFactory.GIF));
        this.changeOD.addActionListener(this);

        jp.add(this.changeOD);
        
        JButton see = new JButton("Test Doc", IconFactory.getImageIcon("html_mini",
                IconFactory.GIF));
        see.addActionListener(this);

        jp.add(see);
                

        return jp;
    }

    
    private JPanel getConsolePanel() {
        
        JPanel bottomPanel = new JPanel();
        bottomPanel.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();

        this.console = new JTextArea();
        this.console.setAutoscrolls(false);
        this.console.setEditable(false);
        this.console.setLineWrap(true);
        this.console.setWrapStyleWord(true);

        JScrollPane consolePane = new JScrollPane(this.console);

        gbc.fill = GridBagConstraints.NONE;
        gbc.anchor = GridBagConstraints.NORTHWEST;
        gbc.insets = new Insets(5, 5, 5, 5);

        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.gridwidth = 2;
        gbc.weightx = 1;
        gbc.weighty = 1;
        gbc.fill = GridBagConstraints.BOTH;
        gbc.insets = new Insets(0, 5, 5, 5);

        bottomPanel.add(consolePane, gbc);

        bottomPanel.setMaximumSize(new Dimension(400, 200));
        bottomPanel.setMinimumSize(new Dimension(400, 200));
        bottomPanel.setPreferredSize(new Dimension(400, 200));
        
        bottomPanel.setBorder(BorderFactory.createTitledBorder(BorderFactory.createLoweredBevelBorder(), "Console"));
        
        return bottomPanel;
    }
    

    private void loadDefaultValues() {
		try {
			this.tfWD.setText(((MainModel)getModel()).getWorkingDirectoryFile().getCanonicalPath());
			this.tfOD.setText(((MainModel)getModel()).getOutputDirectoryFile().getCanonicalPath());
			
			//TODO ercurser
			//this.tfOD.setText(((MainModel)getModel()).getJsDocParameter().getOutputDirectory());
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
	}
    

    public void actionPerformed(ActionEvent e) {
        
    	if (e.getSource().equals(this.changeWD)) {
            JFileChooser jfc = new JFileChooser();
            jfc.setControlButtonsAreShown(true);
            jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
            // jfc.setFileFilter(filter);
            jfc.setCurrentDirectory(((MainModel)getModel()).getWorkingDirectoryFile());
            if (jfc.showSaveDialog(this) == JFileChooser.APPROVE_OPTION) {
                ((MainModel)getModel()).getJsDocParameter().setWorkingDirectory(jfc.getSelectedFile().getName());
                ((MainModel)getModel()).resetTreeModel();
                tree.setModel(((MainModel)getModel()).getTreeModel());
                
                try {
					this.tfWD.setText(jfc.getSelectedFile().getCanonicalPath());
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
            }
        }
    	
    	if (e.getSource().equals(this.changeOD)) {
            JFileChooser jfc = new JFileChooser();
            jfc.setControlButtonsAreShown(true);
            jfc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
            // jfc.setFileFilter(filter);
            jfc.setCurrentDirectory(((MainModel)getModel()).getOutputDirectoryFile());
            if (jfc.showSaveDialog(this) == JFileChooser.APPROVE_OPTION) {
                ((MainModel)getModel()).getJsDocParameter().setOutputDirectory(jfc.getSelectedFile().getName());
                //TODO ((MainModel)getModel()).resetTreeModel();
                
                try {
					this.tfOD.setText(jfc.getSelectedFile().getCanonicalPath());
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
            }
        }
    }

	@Override
	public void refresh() {
		// TODO Auto-generated method stub
		
	}

}
