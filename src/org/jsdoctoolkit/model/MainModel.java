package org.jsdoctoolkit.model;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Hashtable;
import java.util.Iterator;

import javax.swing.ComboBoxModel;
import javax.swing.DefaultComboBoxModel;
import javax.swing.filechooser.FileFilter;
import javax.swing.tree.DefaultTreeModel;

import org.jsdoctoolkit.business.JsDocParameter;
import org.jsdoctoolkit.business.FolderNode;

public class MainModel extends AbstractModel{

    public final static String DEFAULT_LANG = "defaultLang";

    public final static String WD_NAME = "workingDirectory";

    public final static String OUTPUT_NAME = "js_docs_out";
    
    private FolderNode rootNode;

    private DefaultTreeModel treeModel;
    
    
    

    public static boolean isDevelopperMode = false;


    private static Hashtable<String, String> parameters;


    public static String ON = "on";

    public static String OFF = "off";
    
    private JsDocParameter jsDocParameter = null;

    public MainModel() {
    	jsDocParameter = new JsDocParameter();
    }

    /**
     * @param b
     */
    public void setDevelopperMode(boolean b) {
        isDevelopperMode = b;
    }

    /**
     * @return Returns the isDevelopperMode.
     */
    public static boolean isDevelopperMode() {
        return isDevelopperMode;
    }
    
    public void run(){
    	
    	//org.mozilla.javascript.tools.shell.Main.setOut(new PrintStream());
    }

	/**
	 * @return the jsDocParameter
	 */
	public JsDocParameter getJsDocParameter() {
		return jsDocParameter;
	}

	/**
	 * @param jsDocParameter the jsDocParameter to set
	 */
	public void setJsDocParameter(JsDocParameter jsDocParameter) {
		this.jsDocParameter = jsDocParameter;
	}

	public ComboBoxModel getTemplatesList() {
		DefaultComboBoxModel dcbm = new DefaultComboBoxModel();
		File rootTpl = new File("templates");
		

		
		if(rootTpl.isDirectory()){
			
			File[] fileList = rootTpl.listFiles();
			
			for(File f : fileList){
				
				if(f.isDirectory()){
					
					//TODO filter this directory if the publish.hs file was not found
					f.listFiles();
					
					dcbm.addElement(f);
				}
				
			}
		}

		
		
		return dcbm;
	}

	public File getWorkingDirectoryFile() {
		return new File(getJsDocParameter().getWorkingDirectory());
	}
	
	public File getOutputDirectoryFile() {
		return new File(getJsDocParameter().getOutputDirectory());
	}
	
	
    public DefaultTreeModel getTreeModel() {
        if (this.treeModel == null) {
            // initFileNode(getRootNode());
            getRootNode().init(getJsDocParameter().getSubLevel(), 0);
            this.treeModel = new DefaultTreeModel(getRootNode());
        }
        return this.treeModel;
    }

    public void resetTreeModel() {
        this.treeModel = null;
    }

    private FolderNode getRootNode() {
        if (this.rootNode == null) {
            this.rootNode = new FolderNode(getWorkingDirectoryFile(), FolderNode.TYPE_WD);
        }
        return this.rootNode;
    }
}