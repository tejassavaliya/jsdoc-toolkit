package org.jsdoctoolkit.image;

import java.net.URL;

import javax.swing.ImageIcon;

import org.jsdoctoolkit.model.MyLogger;

public class IconFactory {

    public static String GIF = ".gif";

    public static String PNG = ".png";

    public static ImageIcon getImageIcon(String fileName, String fileType) {

        if (!"".equals(fileName)) {
            
            URL imageURL = IconFactory.class.getResource(fileName.toLowerCase()
                    + fileType.toLowerCase());
            
            if(imageURL == null){
                //Gestion des images dans le Jar obfusqué
                imageURL = IconFactory.class.getResource("img/" 
                        + fileName.toLowerCase() + fileType.toLowerCase());   
            }
            if (imageURL != null) {
                ImageIcon img = new ImageIcon(imageURL);
                return img;
            }
        }
        MyLogger.getLogger().info("Image not found !! : " + fileName + fileType);
        return null;
    }
}
