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

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
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

    private static Document cfgDoc;

    public static String ON = "on";

    public static String OFF = "off";
    
    private JsDocParameter jsDocParameter = null;

    public MainModel() {
    	jsDocParameter = new JsDocParameter();
        try {
            initParameters("conf/config.xml");
        } catch (JDOMException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * cette méthode parcours le fichier XML contenant les parametres chacun des parametres est
     * sauvegardé dans une hashmap (nom du param, valeur)
     * 
     * @return HashMap contenant tous les parametres
     * @throws IOException
     * @throws JDOMException
     * 
     */
    public static void initParameters(String fichierProperties) throws JDOMException, IOException {
        long debut = System.currentTimeMillis();

        parameters = new Hashtable<String, String>();

        SAXBuilder sxb = new SAXBuilder();
        cfgDoc = sxb.build(new File(fichierProperties));
        Element root = cfgDoc.getRootElement();

        Iterator it = root.getChildren("param").iterator();
        while (it.hasNext()) {
            Element p = (Element) it.next();
            parameters.put(p.getAttributeValue("name"), p.getAttributeValue("value"));
        }
        long total = System.currentTimeMillis() - debut;
        MyLogger.getLogger().fine("Chargement du fichier XML de config : " + total + " ms");
    }

    public static String getParameter(String name) {
        return parameters.get(name);
    }

    public static boolean getBooleanParameter(String name) {
        return parameters.get(name).equals(ON);
    }

    public static void setBooleanParameter(String name, boolean value) {
        setParameter(name, (value) ? ON : OFF);
    }

    public static void setParameter(String name, String value) {
        parameters.remove(name);
        parameters.put(name, value);
        Iterator it = cfgDoc.getRootElement().getChildren("param").iterator();
        while (it.hasNext()) {
            Element p = (Element) it.next();
            if (p.getAttributeValue("name").equals(name)) {
                p.setAttribute("value", value);
                break;
            }
        }
        saveConfig();
    }

    public static void saveConfig() {
        XMLOutputter sortie = new XMLOutputter(Format.getPrettyFormat());
        try {
            sortie.output(cfgDoc, new FileOutputStream("conf/config.xml"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
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