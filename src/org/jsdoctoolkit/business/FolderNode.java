package org.jsdoctoolkit.business;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;
import java.util.Vector;

import javax.swing.tree.DefaultMutableTreeNode;


public class FolderNode extends DefaultMutableTreeNode {

    public final static int TYPE_WD = 0;

    public final static int TYPE_TLD = 1;

    public final static int TYPE_DOMAIN = 2;

    public final static int TYPE_GROUP = 3;

    public final static int TYPE_LAST_GROUP = 4;

    public final static int TYPE_ECC_FILE = 5;

    public final static int TYPE_JS_FILE = 6;

    public final static int TYPE_HTML_FILE = 7;

    public final static int TYPE_PDF_FILE = 8;

    public final static String SRC_SUFFIX = "_src";
    
    public final static String ECC_EXTENSION = ".ecc";

    public final static String JS_EXTENSION = ".js";

    public final static String API = "_api";
    
    public final static String HTML_EXTENSION = ".html";

    public final static String PDF_EXTENSION = ".pdf";

    private int type;

    public FolderNode(File userObject) {
        super(userObject);
        setType(getGroup(getFile()));
    }

    public FolderNode(File userObject, int type) {
        super(userObject);
        setType(type);
    }

    public FolderNode(File userObject, int type, boolean allowsChildren) {
        super(userObject, allowsChildren);
        setType(type);
    }

    public void setUserObject(File userObject) {
        super.setUserObject(userObject);
    }

    @Override
    public File getUserObject() {
        return (File) super.getUserObject();
    }

    @Override
    public FolderNode getParent() {
        return (FolderNode) super.getParent();
    }

    @Override
    public FolderNode getChildAt(int row) {
        return (FolderNode) super.getChildAt(row);
    }

    public String getFileName() {
        return getFile().getName().substring(0, getFile().getName().indexOf(ECC_EXTENSION));
    }

    public Date getFileDate() {
        return new Date(getFile().lastModified());
    }

    public File getFile() {
        return getUserObject();
    }

    public void setFile(File f) {
        setUserObject(f);
    }

    public File getHTMLFile() {
        return new File(getFile().getParentFile().getAbsolutePath() + File.separator
                + getFileName() + API +HTML_EXTENSION);
    }

    public String getHTMLFileName() {
        return (getHTMLFile().exists()) ? getHTMLFile().getName() : "not created";
    }

    public Date getHTMLFileDate() {
        return (getHTMLFile().exists()) ? new Date(getHTMLFile().lastModified()) : null;
    }

    public void deleteHTMLFile() {
        getHTMLFile().delete();
    }

    public File getPDFFile() {
        return new File(getFile().getParentFile().getAbsolutePath() + File.separator
                + getFileName() + PDF_EXTENSION);
    }

    public String getPDFFileName() {
        return (getPDFFile().exists()) ? getPDFFile().getName() : "not created";
    }

    public Date getPDFFileDate() {
        return (getPDFFile().exists()) ? new Date(getPDFFile().lastModified()) : null;
    }

    public void deletePDFFile() {
        getPDFFile().delete();
    }

    public File getScriptFile() {
        return new File(getFile().getParentFile().getAbsolutePath() + File.separator
                + getFileName() + SRC_SUFFIX + JS_EXTENSION);
    }

    public String getScriptFileName() {
        return (getScriptFile().exists()) ? getScriptFile().getName() : "not created";
    }

    public Date getScriptFileDate() {
        return (getScriptFile().exists()) ? new Date(getScriptFile().lastModified()) : null;
    }

    public void createScriptFile() throws IOException {
        getScriptFile().createNewFile();

        FileWriter fw = new FileWriter(getScriptFile());

        //fw.write(getESXmlDoc().getEcmaScript());

        fw.close();
    }

    public void deleteScriptFile() {
        getScriptFile().delete();
    }
    
    public File getOptimizeFile() {
        return new File(getFile().getParentFile().getAbsolutePath() + File.separator
                + getFileName() + JS_EXTENSION);
    }

    public String getOptimizeFileName() {
        return (getOptimizeFile().exists()) ? getOptimizeFile().getName() : "not created";
    }

    public Date getOptimizeFileDate() {
        return (getOptimizeFile().exists()) ? new Date(getOptimizeFile().lastModified()) : null;
    }

    public void createOptimizeFile() throws IOException {
        getOptimizeFile().createNewFile();

        FileWriter fw = new FileWriter(getOptimizeFile());
        //TODO Optimize
        String res = "";//getESXmlDoc().getEcmaScript();
        
        res = deleteSmallComment(res);
        res = deleteSpaceAndEnter(res);
        res = deleteBigComment(res);
        
        fw.write(res);

        fw.close();
    }
    
    private String deleteSpaceAndEnter(String s){
        return s.replaceAll("[\\\n ]", "");
    }
    
    private String deleteSmallComment(String s){
        // pattern "//  xxx "
        String pattern = "(//).*(\\\n)+";
        
        s = s.replaceAll(pattern, "");
        
        return s;
    }
    
    private String deleteBigComment(String s){
        // pattern "/** xxxx */"
        String pattern = "(/\\*\\*).*(\\*/)+";
        if(s.matches(pattern)) 
            s = s.replaceFirst(pattern, "");
        
        return s;
    }

    public void deleteOptimizeFile() {
        getOptimizeFile().delete();
    }

    public boolean isGreen() {
        return getType() == TYPE_ECC_FILE || getType() == TYPE_LAST_GROUP;
    }

    /**
     * @return Returns the type.
     */
    public int getType() {
        return this.type;
    }

    /**
     * @param type The type to set.
     */
    public void setType(int type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return getFile().getName();

    }

    public String getEtiquette() {
        if (getType() == TYPE_WD) {
            return "";
        } else if (getType() == TYPE_TLD) {
            return toString();
        } else {
            return getParent().getEtiquette() + " / " + toString();
        }
    }

    public boolean isTLD() {
        return TYPE_TLD == getType();
    }

    public boolean isDomain() {
        return TYPE_DOMAIN == getType();
    }

    public boolean isGroup() {
        return TYPE_GROUP == getType();
    }

    public boolean isLastGroup() {
        return TYPE_LAST_GROUP == getType();
    }

    public boolean isFile() {
        return TYPE_ECC_FILE == getType()
            || TYPE_JS_FILE == getType()
            || TYPE_HTML_FILE == getType()
            || TYPE_PDF_FILE == getType();
    }
    
    public boolean isECCFile() {
        return TYPE_ECC_FILE == getType();
    }

    public boolean isScriptFile() {
        return TYPE_JS_FILE == getType();
    }

    public void init(int maxSubLevel, int currentSubLevel) {
        if (getFile().isDirectory()) {
            removeAllChildren();
            File[] files = getFile().listFiles();
            
            currentSubLevel++;
            if(currentSubLevel <= maxSubLevel){
            
	            for (int i = 0; i < files.length; i++) {
	                if(files[i].isDirectory()){
	                int currentType = getTypeFromParent(files[i]);
	                FolderNode nodeToAdd = new FolderNode(files[i], currentType);
	                
	                nodeToAdd.init(maxSubLevel, currentSubLevel);// Recursivité
	                
	                switch (nodeToAdd.getType()) {
	                    case FolderNode.TYPE_WD:
	                    case FolderNode.TYPE_TLD:
	                    case FolderNode.TYPE_DOMAIN:
	                    case FolderNode.TYPE_GROUP:
	                    case FolderNode.TYPE_LAST_GROUP:
	                    case FolderNode.TYPE_ECC_FILE: add(nodeToAdd);
	                        break;
	                    case FolderNode.TYPE_JS_FILE :
	                    case FolderNode.TYPE_HTML_FILE :
	                    case FolderNode.TYPE_PDF_FILE : addChild(nodeToAdd);
	                        break;
	                }
	                }
	            } 
            }
        }
    }

    private void addChild(FolderNode nodeToAdd) {
        FolderNode fn;
        for(int i = 0 ; i < getChildCount(); i++){
            fn = getChildAt(i);
            if(nodeToAdd.getComponentName().startsWith(fn.getComponentName())){
                fn.add(nodeToAdd);
                break;
            }
        }
        
    }

    private String getComponentName() {
        return getFile().getName().substring(0, getFile().getName().lastIndexOf(".")); 
    }

    private int getTypeFromParent(File f) {
        int res = 0;
        switch (getType()) {
        case FolderNode.TYPE_WD:
            res = FolderNode.TYPE_TLD;
            break;
        case FolderNode.TYPE_TLD:
            res = FolderNode.TYPE_DOMAIN;
            break;
        case FolderNode.TYPE_DOMAIN:
        case FolderNode.TYPE_GROUP:
        case FolderNode.TYPE_LAST_GROUP:
            res = getGroup(f);
            break;
        }
        return res;
    }

    public int getGroup(File f) {
        if (f.isDirectory()) {
            File[] files = f.listFiles();
            for (int i = 0; i < files.length; i++) {
                if (files[i].getName().indexOf(".ecc") != -1) {
                    return FolderNode.TYPE_LAST_GROUP;
                }
            }
        } else if (f.isFile()) {
            if (f.getName().indexOf(ECC_EXTENSION) != -1) {
                return FolderNode.TYPE_ECC_FILE;
            } else if (f.getName().indexOf(JS_EXTENSION) != -1) {
                return FolderNode.TYPE_JS_FILE;
            } else if (f.getName().indexOf(HTML_EXTENSION) != -1) {
                return FolderNode.TYPE_HTML_FILE;
            } else if (f.getName().indexOf(PDF_EXTENSION) != -1) {
                return FolderNode.TYPE_PDF_FILE;
            }
        }
        return FolderNode.TYPE_GROUP;
    }

    /*public Document load(File f) {
        SAXBuilder sxb = new SAXBuilder();
        Document doc = null;
        if (f.isFile() && f.getName().indexOf(ECC_EXTENSION) != -1) {
            try {
                doc = sxb.build(f);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return doc;
    }

    public void loadOne() {
        getComponents().removeAllElements();
        getComponents().add(load(getFile()));
    }

    public void loadAll() {

        getComponents().removeAllElements();
        File[] files = getFile().listFiles();
        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile() && files[i].getName().indexOf(ECC_EXTENSION) != -1) {
                setType(FolderNode.TYPE_LAST_GROUP);
                getComponents().add(load(files[i]));
            }
        }
    }*/

    /**
     * @return Returns the components.
     */
    public Vector<FolderNode> getChildren() {
        Vector<FolderNode> v = new Vector<FolderNode>();

        for (int i = 0; i < getChildCount(); i++) {
            v.add(getChildAt(i));
        }

        return v;
    }

    /**
     * @return Returns the components.
     */
    public Vector<FolderNode> getECCChildren() {
        Vector<FolderNode> v = new Vector<FolderNode>();

        for (int i = 0; i < getChildCount(); i++) {
            if (getChildAt(i).isECCFile())
                v.add(getChildAt(i));
        }

        return v;
    }

}
