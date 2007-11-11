package org.jsdoctoolkit.view;

import java.awt.LayoutManager;

import javax.swing.JPanel;

import org.jsdoctoolkit.model.AbstractModel;

public abstract class AbstractView extends JPanel {
	
	private AbstractModel model = null;

    public AbstractView(LayoutManager layout, boolean isDoubleBuffered) {
        super(layout, isDoubleBuffered);
        // TODO Auto-generated constructor stub
    }

    public AbstractView(LayoutManager layout) {
        super(layout);
        // TODO Auto-generated constructor stub
    }

    public AbstractView(boolean isDoubleBuffered) {
        super(isDoubleBuffered);
        // TODO Auto-generated constructor stub
    }

    public AbstractView(AbstractModel model) {
        super();
        setModel(model);
    }

    public abstract void refresh();

	/**
	 * @return the model
	 */
	public AbstractModel getModel() {
		return model;
	}

	/**
	 * @param model the model to set
	 */
	public void setModel(AbstractModel model) {
		this.model = model;
	}

}
