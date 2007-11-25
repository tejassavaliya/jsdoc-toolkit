package org.jsdoctoolkit.business;

import java.util.StringTokenizer;

public class JsDocParameter {
	
	
	private boolean isPrivate = false;
	
	private boolean isIncludeAll =false;
	
	private boolean isIncludeAllEvenOthers =false;
	
	private int subLevel = 6;
	
	private String fileExtension = "js";
	
	private String logFile = null;
	
	private String templateDirectory = "templates/sweet";
	
	private String outputDirectory = "js_docs_out";
	
	private String workingDirectory = "workingDirectory";

	/**
	 * @return the isPrivate
	 */
	public boolean isPrivate() {
		return this.isPrivate;
	}

	/**
	 * @param isPrivate the isPrivate to set
	 */
	public void setPrivate(boolean isPrivate) {
		this.isPrivate = isPrivate;
	}

	/**
	 * @return the isIncludeAll
	 */
	public boolean isIncludeAll() {
		return this.isIncludeAll;
	}

	/**
	 * @param isIncludeAll the isIncludeAll to set
	 */
	public void setIncludeAll(boolean isIncludeAll) {
		this.isIncludeAll = isIncludeAll;
	}

	/**
	 * @return the isIncludeAllEvenOthers
	 */
	public boolean isIncludeAllEvenOthers() {
		return this.isIncludeAllEvenOthers;
	}

	/**
	 * @param isIncludeAllEvenOthers the isIncludeAllEvenOthers to set
	 */
	public void setIncludeAllEvenOthers(boolean isIncludeAllEvenOthers) {
		this.isIncludeAllEvenOthers = isIncludeAllEvenOthers;
	}

	/**
	 * @return the subLevel
	 */
	public int getSubLevel() {
		return this.subLevel;
	}

	/**
	 * @param subLevel the subLevel to set
	 */
	public void setSubLevel(int subLevel) {
		this.subLevel = subLevel;
	}

	/**
	 * @return the flieExtension
	 */
	public String getFlieExtension() {
		return this.fileExtension;
	}

	/**
	 * @param flieExtension the flieExtension to set
	 */
	public void setFlieExtension(String flieExtension) {
		this.fileExtension = flieExtension;
	}

	/**
	 * @return the logFile
	 */
	public String getLogFile() {
		return this.logFile;
	}

	/**
	 * @param logFile the logFile to set
	 */
	public void setLogFile(String logFile) {
		this.logFile = logFile;
	}

	/**
	 * @return the templateDirectory
	 */
	public String getTemplateDirectory() {
		return this.templateDirectory;
	}

	/**
	 * @param templateDirectory the templateDirectory to set
	 */
	public void setTemplateDirectory(String templateDirectory) {
		this.templateDirectory = templateDirectory;
	}

	/**
	 * @return the outputDirectory
	 */
	public String getOutputDirectory() {
		return this.outputDirectory;
	}

	/**
	 * @param outputDirectory the outputDirectory to set
	 */
	public void setOutputDirectory(String outputDirectory) {
		this.outputDirectory = outputDirectory;
	}

	/**
	 * @return the workingDirectory
	 */
	public String getWorkingDirectory() {
		return this.workingDirectory;
	}

	/**
	 * @param workingDirectory the workingDirectory to set
	 */
	public void setWorkingDirectory(String workingDirectory) {
		this.workingDirectory = workingDirectory;
	}
	


	public String[] getArguments() {
		StringBuilder sb = new StringBuilder();
		
		sb.append("app/run.js");
		
		if(isPrivate){
			sb.append("::-p");
		}
		if(isIncludeAll){
			sb.append("::-a");
		}
		if(isIncludeAllEvenOthers){
			sb.append("::-A");
		}
		
		if(subLevel > 0){
			sb.append("::-r="+subLevel);
		}
		
		if(getWorkingDirectory()!=null){
			sb.append("::"+getWorkingDirectory());
		}
		
		if(getTemplateDirectory()!=null){
			sb.append("::-t="+getTemplateDirectory());
		}else{
			System.err.println("Erreur fatal pas de template");
		}

		if(getOutputDirectory()!=null){
			sb.append("::-d="+getOutputDirectory());
		}
		
		StringTokenizer st =new StringTokenizer(sb.toString(), "::");
		String [] args = new String[st.countTokens()];
		for(int i = 0 ; st.hasMoreElements();i++){
			args[i] = st.nextToken();
			System.out.println(args[i]);
		}
				
		return args;
	}
	
	

}
