package org.jsdoctoolkit.view;

import java.awt.Component;
import java.awt.Dimension;

public class Ressources {

    public static final String AUTO_GENERATE = "AUTO_GENERATE";

    public static final String QUICK_GENERATE = "QUICK_GENERATE";

    public static final String OPEN = "open";

    public static final String SAVE = "save";

    public static final String SAVE_ALL = "save_all";

    public static final String DOWN_ARROW = "down";

    public static final String UP_ARROW = "up";

    public static final String CLOSE = "CLOSE";

    public static final String ABOUT = "ABOUT";

    public static final String CHOOSE_XML = "CHOOSE_XML";

    public static final String ADD_NEW_XML = "ADD_NEW_XML";

    public static final String ADD_XML = "ADD_XML";

    public static final String REMOVE_XML = "REMOVE_XML";

    public static final String CHOOSE_COMPONENT = "CHOOSE_COMPONENT";

    public static final String ADD_COMPONENT = "ADD_COMPONENT";

    public static final String REMOVE_COMPONENT = "REMOVE_COMPONENT";

    public static final String CHOOSE_PROPERTY = "CHOOSE_PROPERTY";

    public static final String ADD_PROPERTY = "ADD_PROPERTY";

    public static final String REMOVE_PROPERTY = "REMOVE_PROPERTY";

    public static final String REMOVE_ALL_PROPERTIES = "REMOVE_ALL_PROPERTIES";

    public static final String CHOOSE_METHOD = "CHOOSE_METHOD";

    public static final String ADD_METHOD = "ADD_METHOD";

    public static final String REMOVE_METHOD = "REMOVE_METHOD";

    public static final String REMOVE_ALL_METHODS = "REMOVE_ALL_METHODS";

    public static final String CHOOSE_PARAMETER = "CHOOSE_PARAMETER";

    public static final String ADD_PARAMETER = "ADD_PARAMETER";

    public static final String REMOVE_PARAMETER = "REMOVE_PARAMETER";

    public static final String REMOVE_ALL_PARAMETERS = "REMOVE_ALL_PARAMETERS";

    public static final String CHOOSE_EVENT = "CHOOSE_EVENT";

    public static final String ADD_EVENT = "ADD_EVENT";

    public static final String REMOVE_EVENT = "REMOVE_EVENT";

    public static final String REMOVE_ALL_EVENTS = "REMOVE_ALL_EVENTS";

    public static void formatComponent(Component tfName, int width) {

        Dimension d = new Dimension(width, 20);
        tfName.setPreferredSize(d);
        tfName.setMaximumSize(d);
        tfName.setMinimumSize(d);
    }

    public static final String ABOUT_TEXT = "<html>Ecma Script Component Builder for Emuki-Look Project<br><a href=\"http://www.emukina.fr\">www.emukina.fr</a></html>";

}
