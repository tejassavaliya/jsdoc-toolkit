package org.jsdoctoolkit.view;

import javax.swing.tree.DefaultTreeCellRenderer;

public class TreeFileCellRenderer extends DefaultTreeCellRenderer {

    public TreeFileCellRenderer() {
        super();
    }

    /*
     * (non-Javadoc)
     * 
     * @see javax.swing.tree.DefaultTreeCellRenderer#getTreeCellRendererComponent(javax.swing.JTree,
     * java.lang.Object, boolean, boolean, boolean, int, boolean)
     */
    //@Override
   /* public Component getTreeCellRendererComponent(@SuppressWarnings("hiding") JTree tree, Object value, boolean sel,
            boolean expanded, boolean leaf, int row, @SuppressWarnings("hiding") boolean hasFocus) {
        if (value instanceof FolderNode) {

            JLabel l = (JLabel) super.getTreeCellRendererComponent(tree, ((FolderNode) value)
                    .toString(), sel, expanded, leaf, row, hasFocus);

            if (((FolderNode) value).getType() == FolderNode.TYPE_WD) {
                l.setIcon(IconFactory.getImageIcon("wd", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_TLD) {
                l.setIcon(IconFactory.getImageIcon("tld", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_DOMAIN) {
                l.setIcon(IconFactory.getImageIcon("domain", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_GROUP) {
                l.setIcon(IconFactory.getImageIcon("group", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_LAST_GROUP) {
                l.setIcon(IconFactory.getImageIcon("lastgroup", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_ECC_FILE) {
                l.setIcon(IconFactory.getImageIcon("new", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_JS_FILE) {
                l.setIcon(IconFactory.getImageIcon("script", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_HTML_FILE) {
                l.setIcon(IconFactory.getImageIcon("new", IconFactory.GIF));
            } else if (((FolderNode) value).getType() == FolderNode.TYPE_PDF_FILE) {
                l.setIcon(IconFactory.getImageIcon("new", IconFactory.GIF));
            }
            return l;
        }

        return super.getTreeCellRendererComponent(tree, value, sel, expanded, leaf, row,
                hasFocus);
    }*/

}
